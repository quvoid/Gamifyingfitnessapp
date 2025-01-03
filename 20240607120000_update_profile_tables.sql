-- Add profile-related columns to users table
ALTER TABLE users
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN profile_picture_url TEXT;

-- Update RLS policies for profile operations
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read their own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Update indexes for profile queries
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_profile_picture ON users(profile_picture_url);

-- Create exercise tracking table
CREATE TABLE exercise_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exercise_type TEXT NOT NULL,
  target_reps INTEGER NOT NULL,
  completed_reps INTEGER DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exercise_type, date)
);

-- RLS policies for exercise tracking
CREATE POLICY "Users can manage their own exercise tracking"
ON exercise_tracking FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Index for exercise tracking queries
CREATE INDEX idx_exercise_tracking_user ON exercise_tracking(user_id);
CREATE INDEX idx_exercise_tracking_date ON exercise_tracking(date);
