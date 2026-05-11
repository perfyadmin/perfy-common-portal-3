CREATE TABLE public.sales_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  company TEXT,
  selected_modules TEXT[] NOT NULL DEFAULT '{}',
  message TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a lead
CREATE POLICY "Anyone can submit a sales lead"
  ON public.sales_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view leads (admin history)
CREATE POLICY "Authenticated users can view sales leads"
  ON public.sales_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_sales_leads_created_at ON public.sales_leads (created_at DESC);