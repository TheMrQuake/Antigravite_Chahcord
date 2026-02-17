-- Create a public bucket for uploads
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true);

-- Policy to allow authenticated users to upload images
create policy "Authenticated users can upload images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'uploads' );

-- Policy to allow public to view images
create policy "Public can view images"
on storage.objects for select
to public
using ( bucket_id = 'uploads' );
