import cv2
import mediapipe as mp
import numpy as np

class PushUpTracker:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils

        self.counter = 0
        self.stage = None
        self.angle_threshold_down = 90  # Angle when body is in the down position
        self.angle_threshold_up = 160  # Angle when body is in the up position

    def calculate_angle(self, a, b, c):
        a = np.array(a)  # Point A
        b = np.array(b)  # Point B
        c = np.array(c)  # Point C

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360 - angle

        return angle

    def process_frame(self, frame):
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        results = self.pose.process(image)

        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark

            # Get coordinates of relevant joints
            shoulder = [landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                        landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                     landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                     landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].y]

            # Calculate angle at the elbow
            angle = self.calculate_angle(shoulder, elbow, wrist)

            # Detect push-up stages
            if angle <= self.angle_threshold_down:
                self.stage = "down"
            if angle >= self.angle_threshold_up and self.stage == "down":
                self.stage = "up"
                self.counter += 1

        except Exception as e:
            pass

        # Display the counter on the video feed
        cv2.putText(image, f"Push-Ups: {self.counter}", (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        # Draw landmarks
        self.mp_drawing.draw_landmarks(
            image, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS)

        return image


def main():
    tracker = PushUpTracker()
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            break

        processed_frame = tracker.process_frame(frame)

        cv2.imshow('Push-Up Tracker', processed_frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
