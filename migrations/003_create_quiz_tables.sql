-- Define ENUM type for BDI interpretations
CREATE TYPE quiz.bdi_interpretation_enum AS ENUM (
  'These ups and downs are considered normal',
  'Mild mood disturbance',
  'Borderline clinical depression',
  'Moderate depression',
  'Severe depression',
  'Extreme depression',
  'Invalid data'
);
-- Create a function to sum integer arrays (used for calculating BDI scores)
CREATE OR REPLACE FUNCTION quiz.array_sum(arr INTEGER []) RETURNS INTEGER AS $$
SELECT COALESCE(SUM(x), 0)
FROM UNNEST(arr) x;
$$ LANGUAGE sql IMMUTABLE;
-- Create a function to interpret BDI scores
CREATE OR REPLACE FUNCTION quiz.interpret_bdi_score(score INTEGER) RETURNS quiz.bdi_interpretation_enum AS $$ BEGIN RETURN CASE
    WHEN score BETWEEN 0 AND 10 THEN 'These ups and downs are considered normal'::quiz.bdi_interpretation_enum
    WHEN score BETWEEN 11 AND 16 THEN 'Mild mood disturbance'::quiz.bdi_interpretation_enum
    WHEN score BETWEEN 17 AND 20 THEN 'Borderline clinical depression'::quiz.bdi_interpretation_enum
    WHEN score BETWEEN 21 AND 30 THEN 'Moderate depression'::quiz.bdi_interpretation_enum
    WHEN score BETWEEN 31 AND 40 THEN 'Severe depression'::quiz.bdi_interpretation_enum
    WHEN score BETWEEN 41 AND 63 THEN 'Extreme depression'::quiz.bdi_interpretation_enum
    ELSE 'Invalid data'::quiz.bdi_interpretation_enum
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
-- Create bdi_responses table to store user responses for BDI quiz sessions
CREATE TABLE IF NOT EXISTS quiz.bdi_responses (
  response_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  selected_options INTEGER [] NOT NULL,
  -- Array of selected option values for all questions
  session_id UUID NOT NULL,
  -- Unique identifier for the quiz session
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  total_score INTEGER GENERATED ALWAYS AS (quiz.array_sum(selected_options)) STORED,
  interpretation quiz.bdi_interpretation_enum GENERATED ALWAYS AS (
    quiz.interpret_bdi_score(quiz.array_sum(selected_options))
  ) STORED
);