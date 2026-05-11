
-- Partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  company TEXT,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active partners are public"
ON public.partners FOR SELECT
USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert partners"
ON public.partners FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update partners"
ON public.partners FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete partners"
ON public.partners FOR DELETE
TO authenticated
USING (true);

-- Reuse / create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_partners_sort ON public.partners (sort_order, created_at);

-- Storage bucket for partner photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-photos', 'partner-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Partner photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-photos');

CREATE POLICY "Authenticated can upload partner photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'partner-photos');

CREATE POLICY "Authenticated can update partner photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'partner-photos');

CREATE POLICY "Authenticated can delete partner photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'partner-photos');
