-- Enable RLS for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read their own data
CREATE POLICY "Users can read their own data"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Policy: Allow authenticated users to insert their own data
CREATE POLICY "Users can insert their own data"
ON users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Policy: Allow authenticated users to update their own data
CREATE POLICY "Users can update their own data"
ON users
FOR UPDATE
USING (auth.uid() = id);
