-- Enable RLS for profile-pictures bucket
create policy "Users can upload their own profile pictures"
on storage.objects for insert
with check (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can view their own profile pictures"
on storage.objects for select
using (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
);
