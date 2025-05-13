-- Create ENUM types for categories and frequencies
CREATE TYPE habit.goal_category AS ENUM ('health', 'career', 'personal');
CREATE TYPE habit.frequency AS ENUM ('daily', 'weekly', 'monthly');
-- Create habit and goal tracking tables
CREATE TABLE IF NOT EXISTS habit.goals (
  goal_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category habit.goal_category,
  -- ENUM type for categories
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_date DATE,
  progress INTEGER CHECK (
    progress BETWEEN 0 AND 100
  ),
  -- percentage complete
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Milestones for larger goals
CREATE TABLE IF NOT EXISTS habit.milestones (
  milestone_id SERIAL PRIMARY KEY,
  goal_id INTEGER NOT NULL REFERENCES habit.goals(goal_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Daily/weekly habits
CREATE TABLE IF NOT EXISTS habit.habits (
  habit_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  frequency habit.frequency NOT NULL,
  -- ENUM type for frequencies
  goal_id INTEGER REFERENCES habit.goals(goal_id),
  -- Optional goal association
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  -- Optional end date
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Habit tracking logs
CREATE TABLE IF NOT EXISTS habit.tracking (
  tracking_id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habit.habits(habit_id) ON DELETE CASCADE,
  tracking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(habit_id, tracking_date) -- Prevent duplicate entries for the same habit and date
);
-- Habit streaks table - can be updated via triggers or application logic
CREATE TABLE IF NOT EXISTS habit.streaks (
  streak_id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL REFERENCES habit.habits(habit_id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_tracked_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);