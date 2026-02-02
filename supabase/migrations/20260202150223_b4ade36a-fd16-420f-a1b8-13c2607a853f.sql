-- Add unique constraint on user_id to enforce one submission per user
ALTER TABLE public.registrations ADD CONSTRAINT registrations_user_id_unique UNIQUE (user_id);