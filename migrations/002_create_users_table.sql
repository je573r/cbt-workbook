-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL,
  -- Can be NULL for OAuth-only users
  auth_type VARCHAR(50) DEFAULT 'local',
  -- 'local', 'oauth', 'google', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create separate table for authentication providers
CREATE TABLE IF NOT EXISTS user_auth_providers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  -- 'google', 'facebook', 'local', etc.
  provider_user_id VARCHAR(255),
  -- ID from the provider
  provider_data JSONB,
  -- Flexible storage for provider-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_user_id)
);
--