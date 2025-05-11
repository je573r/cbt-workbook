-- Create activity planning tables
CREATE TYPE activity.category_enum AS ENUM (
  'Physical',
  'Social',
  'Pleasure',
  'Mastery',
  'Self-care'
);
-- Activity planning table
CREATE TABLE IF NOT EXISTS activity.planned_activities (
  activity_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category activity.category_enum NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  duration_minutes INTEGER,
  difficulty_rating INTEGER CHECK (
    difficulty_rating BETWEEN 1 AND 10
  ),
  pleasure_rating INTEGER CHECK (
    pleasure_rating BETWEEN 1 AND 10
  ),
  completed BOOLEAN DEFAULT FALSE,
  completion_notes TEXT,
  actual_pleasure_rating INTEGER CHECK (
    actual_pleasure_rating BETWEEN 1 AND 10
  ),
  actual_mastery_rating INTEGER CHECK (
    actual_mastery_rating BETWEEN 1 AND 10
  ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);