/*
  # Initial Schema Setup for Fitness Gamification

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - username (text)
      - gender (text)
      - height (numeric)
      - weight (numeric)
      - bmi (numeric)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - achievements
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - title (text)
      - description (text)
      - unlocked_at (timestamp)
      
    - exercises
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - difficulty (text)
      - type (text)
      - created_at (timestamp)
    
    - user_exercises
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - exercise_id (uuid, references exercises)
      - completed (boolean)
      - completed_at (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  username text UNIQUE NOT NULL,
  gender text,
  height numeric,
  weight numeric,
  bmi numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Achievements table
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  unlocked_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Exercises table
CREATE TABLE exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exercises"
  ON exercises FOR SELECT
  TO authenticated
  USING (true);

-- User exercises table
CREATE TABLE user_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  exercise_id uuid REFERENCES exercises NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz
);

ALTER TABLE user_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own exercises"
  ON user_exercises FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercises"
  ON user_exercises FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);