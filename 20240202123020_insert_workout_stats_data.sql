-- Insert running stats data
INSERT INTO running_stats (id, activity_id, distance, pace, calories_burned) VALUES
('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 5.2, 5.45, 350),
('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000202', 3.8, 6.10, 280);

-- Insert weight lifting stats data
INSERT INTO weight_lifting_stats (id, activity_id, total_weight_lifted, sets_completed, reps_completed, calories_burned) VALUES
('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000201', 1200, 4, 40, 450),
('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000202', 1500, 5, 50, 550);

-- Insert leaderboard data
INSERT INTO leaderboard (id, user_id, position, total_points) VALUES
('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000001', 1, 1200),
('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000002', 2, 1150),
('00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000003', 3, 1100);

-- Insert user statistics data
INSERT INTO user_statistics (id, user_id, total_activities, total_points_earned, total_distance_run, total_weight_lifted) VALUES
('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000001', 5, 1200, 15.2, 3000),
('00000000-0000-0000-0000-000000000602', '00000000-0000-0000-0000-000000000002', 4, 1150, 12.8, 2500),
('00000000-0000-0000-0000-000000000603', '00000000-0000-0000-0000-000000000003', 3, 1100, 10.5, 2000);