-- Add username and profile_picture_url to users table
ALTER TABLE users
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN profile_picture_url TEXT;
