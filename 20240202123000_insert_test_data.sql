-- Insert test users
INSERT INTO users (id, email, full_name, avatar_url, points) VALUES
('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Doe', 'https://randomuser.me/api/portraits/men/1.jpg', 1200),
('00000000-0000-0000-0000-000000000002', 'jane@example.com', 'Jane Smith', 'https://randomuser.me/api/portraits/women/2.jpg', 1150),
('00000000-0000-0000-0000-000000000003', 'mike@example.com', 'Mike Johnson', 'https://randomuser.me/api/portraits/men/3.jpg', 1100);

-- Insert test rewards
INSERT INTO rewards (id, name, description, points_required, image_url) VALUES
('00000000-0000-0000-0000-000000000101', 'Amazon Gift Card', '$10 Amazon Gift Card', 1000, 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png'),
('00000000-0000-0000-0000-000000000102', 'Starbucks Gift Card', '$5 Starbucks Gift Card', 800, 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png');

-- Insert test activities
INSERT INTO activities (id, user_id, activity_type, duration, points_earned) VALUES
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'running', 30, 100),
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000002', 'weight_lifting', 45, 150);
