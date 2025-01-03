-- Create running_stats table
CREATE TABLE running_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  distance NUMERIC NOT NULL, -- in kilometers
  pace NUMERIC NOT NULL, -- in minutes per kilometer
  calories_burned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weight_lifting_stats table
CREATE TABLE weight_lifting_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  total_weight_lifted NUMERIC NOT NULL, -- in kilograms
  sets_completed INTEGER NOT NULL,
  reps_completed INTEGER NOT NULL,
  calories_burned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_statistics table
CREATE TABLE user_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_activities INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  total_distance_run NUMERIC DEFAULT 0, -- in kilometers
  total_weight_lifted NUMERIC DEFAULT 0, -- in kilograms
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_running_stats_activity_id ON running_stats(activity_id);
CREATE INDEX idx_weight_lifting_stats_activity_id ON weight_lifting_stats(activity_id);
CREATE INDEX idx_leaderboard_user_id ON leaderboard(user_id);
CREATE INDEX idx_user_statistics_user_id ON user_statistics(user_id);
