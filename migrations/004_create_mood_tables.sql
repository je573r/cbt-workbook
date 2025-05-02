-- Create mood tracking tables
CREATE TABLE IF NOT EXISTS mood.entries (
  entry_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood_rating INTEGER NOT NULL CHECK (
    mood_rating BETWEEN 1 AND 10
  ),
  energy_level INTEGER NOT NULL CHECK (
    energy_level BETWEEN 1 AND 10
  ),
  context TEXT,
  -- What was happening at the time
  situation TEXT,
  -- Brief description of situation
  physical_symptoms TEXT [],
  -- Array of symptoms like "headache", "tension", etc.
  thoughts TEXT,
  -- What thoughts were going through your mind
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  mood_date DATE DEFAULT CURRENT_DATE -- Allow backdating for missed entries
);