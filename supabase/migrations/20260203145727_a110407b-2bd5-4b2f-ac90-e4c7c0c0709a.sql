-- Add missing columns to registrations table for all form fields
ALTER TABLE public.registrations
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS age text,
ADD COLUMN IF NOT EXISTS linkedin text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS phd_expertise text,
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS designation text,
ADD COLUMN IF NOT EXISTS join_experts text,
ADD COLUMN IF NOT EXISTS expert_teams text[],
ADD COLUMN IF NOT EXISTS current_constituency text,
ADD COLUMN IF NOT EXISTS urban_constituency text,
ADD COLUMN IF NOT EXISTS rural_constituency text;