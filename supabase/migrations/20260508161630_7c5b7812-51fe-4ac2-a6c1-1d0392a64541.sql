DROP POLICY IF EXISTS "Authenticated can upload partner photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update partner photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete partner photos" ON storage.objects;

CREATE POLICY "Public can upload partner photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'partner-photos');

CREATE POLICY "Public can update partner photos"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id = 'partner-photos') WITH CHECK (bucket_id = 'partner-photos');

CREATE POLICY "Public can delete partner photos"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id = 'partner-photos');