-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true);

-- Allow authenticated users to upload their own images
CREATE POLICY "Users can upload listing images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listing-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own images
CREATE POLICY "Users can update their own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'listing-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'listing-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow anyone to view listing images (public bucket)
CREATE POLICY "Anyone can view listing images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'listing-images');