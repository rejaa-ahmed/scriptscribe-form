-- Create registrations table to store form submissions
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Personal Info (Step 1)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  country TEXT,
  
  -- Pakistan Academics (Step 2)
  is_student TEXT,
  pakistan_degree TEXT,
  pakistan_university TEXT,
  pakistan_department TEXT,
  pakistan_graduation_year TEXT,
  
  -- Overseas Academics (Step 3)
  overseas_degree TEXT,
  overseas_university TEXT,
  overseas_department TEXT,
  overseas_graduation_year TEXT,
  overseas_country TEXT,
  current_occupation TEXT,
  employer TEXT,
  job_title TEXT,
  
  -- Contribution (Step 4)
  areas_of_interest TEXT[],
  expertise TEXT,
  availability TEXT,
  
  -- Commitment (Step 5)
  part_of_solution TEXT,
  skills TEXT,
  time_commitment TEXT,
  referral TEXT,
  comments TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Users can view their own registrations
CREATE POLICY "Users can view their own registrations"
  ON public.registrations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own registrations
CREATE POLICY "Users can create their own registrations"
  ON public.registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own registrations
CREATE POLICY "Users can update their own registrations"
  ON public.registrations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();