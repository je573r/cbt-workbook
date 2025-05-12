-- Create ENUM type for cognitive distortions
CREATE TYPE thought.cognitive_distortion AS ENUM (
  'All-or-Nothing Thinking',
  'Overgeneralization',
  'Mental Filter',
  'Disqualifying the Positive',
  'Jumping to Conclusions',
  'Mind Reading',
  'Fortune Telling',
  'Magnification / Minimization',
  'Emotional Reasoning',
  'Should Statements',
  'Labeling',
  'Personalization and Blame'
);
-- Create thought record tables per Burns' cognitive model
CREATE TABLE IF NOT EXISTS thought.records (
  record_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  situation TEXT NOT NULL,
  -- Event that triggered the negative thoughts
  emotions TEXT [] NOT NULL,
  -- Array of emotions felt
  emotion_intensity INTEGER [] NOT NULL,
  -- Intensity ratings for each emotion (1-10)
  automatic_thoughts TEXT NOT NULL,
  -- Automatic thoughts that came to mind
  cognitive_distortions thought.cognitive_distortion [],
  -- Array of identified cognitive distortions
  rational_response TEXT,
  -- Balanced alternative thought
  outcome_emotions TEXT [],
  -- Emotions after reframing
  outcome_intensity INTEGER [],
  -- Intensity of emotions after reframing (1-10)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  belief_original INTEGER CHECK (
    belief_original BETWEEN 0 AND 100
  ),
  -- % belief in original thought
  belief_after INTEGER CHECK (
    belief_after BETWEEN 0 AND 100
  ) -- % belief after reframing
);