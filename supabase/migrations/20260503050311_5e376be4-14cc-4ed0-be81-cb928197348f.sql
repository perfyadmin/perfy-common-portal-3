DROP POLICY "Anyone can submit a sales lead" ON public.sales_leads;

CREATE POLICY "Anyone can submit a sales lead"
  ON public.sales_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 200
    AND char_length(mobile) BETWEEN 4 AND 30
    AND (company IS NULL OR char_length(company) <= 200)
    AND (message IS NULL OR char_length(message) <= 2000)
    AND coalesce(array_length(selected_modules, 1), 0) <= 50
  );