-- For grouping gratitude entries by theme
CREATE TYPE gratitude.category AS ENUM (
  'Relationships',
  'Personal Growth',
  'Nature',
  'Health',
  'Daily Life'
);
-- Create gratitude journal and board tables
CREATE TABLE IF NOT EXISTS gratitude.entries (
  entry_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  -- The gratitude entry content
  category gratitude.category NOT NULL,
  is_private BOOLEAN DEFAULT TRUE,
  -- Control whether this is to be shared to community board
  media_url TEXT,
  -- Optional URL for image/media attachment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- For community gratitude board/gallery
CREATE TABLE IF NOT EXISTS gratitude.board_entries (
  board_id SERIAL PRIMARY KEY,
  entry_id INTEGER NOT NULL REFERENCES gratitude.entries(entry_id) ON DELETE CASCADE,
  approval_status VARCHAR(50) DEFAULT 'approved',
  -- For moderation if needed
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- For reactions to board entries
CREATE TABLE IF NOT EXISTS gratitude.reactions (
  reaction_id SERIAL PRIMARY KEY,
  board_id INTEGER NOT NULL REFERENCES gratitude.board_entries(board_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction_type VARCHAR(50) NOT NULL,
  -- 'like', 'heart', 'support', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(board_id, user_id, reaction_type) -- One reaction type per user per entry
);