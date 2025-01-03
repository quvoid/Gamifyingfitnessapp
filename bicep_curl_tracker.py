import cv2
import mediapipe as mp
import numpy as np

class BicepCurlTracker:
    def __init__(self):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.counter = 0
        self.stage = None
        self.angle_threshold = 160

    def calculate_angle(self, a, b, c):
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)
        
        radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
        angle = np.abs(radians*180.0/np.pi)
        
        if angle > 180.0:
            angle = 360-angle
            
        return angle

    def process_frame(self, frame):
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        results = self.pose.process(image)
        
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        try:
            landmarks = results.pose_landmarks.landmark
            
            shoulder = [landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                       landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                    landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                    landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            
            angle = self.calculate_angle(shoulder, elbow, wrist)
            
            cv2.putText(image, str(angle), 
                       tuple(np.multiply(elbow, [640, 480]).astype(int)), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)
            
            if angle > self.angle_threshold:
                self.stage = "down"
            if angle < 30 and self.stage == 'down':
                self.stage = "up"
                self.counter += 1
                
        except:
            pass
        
        cv2.putText(image, 'REPS', (15,12), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
        cv2.putText(image, str(self.counter), 
                   (10,60), 
                   cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)
        
        self.mp_drawing.draw_landmarks(image, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS,
                                self.mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                self.mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))
        
        return image, self.counter

    def release(self):
        self.pose.close()
