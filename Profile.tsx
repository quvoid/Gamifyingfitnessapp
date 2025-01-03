import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { getUserById } from '../utils/userQueries';

const Profile: React.FC = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    
    const fetchUserData = async () => {
      try {
        // Get auth user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        
        if (!isMounted) return;
        setAuthUser(user);
        
        // Get additional user data from users table
        if (user?.id) {
          const data = await getUserById(user.id);
          if (!isMounted) return;
          
          setUserData(data);
          if (data?.username) setUsername(data.username);
        }
      } catch (error) {
        if (!isMounted) return;
        const err = error as { message?: string; code?: string; details?: string };
        console.error('Error fetching user:', {
          message: err.message || 'Unknown error',
          code: err.code || 'N/A',
          details: err.details || 'No details available'
        });
        setError('Failed to load profile. Please try again.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserData();
    
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Set up realtime subscription
  useEffect(() => {
    if (!authUser?.id) return;
    
    let channel: any;
    let isMounted = true;

    try {
      channel = supabase
        .channel('user-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'users',
            filter: `id=eq.${authUser.id}`
          },
          (payload) => {
            if (isMounted) {
              setUserData(payload.new);
            }
          }
        )
        .subscribe((status, err) => {
          if (err) {
            console.error('Realtime subscription error:', {
              status,
              message: err?.message || 'Unknown error'
            });
          }
        });
    } catch (error) {
      const err = error as { message?: string; code?: string };
      console.error('Error setting up realtime subscription:', {
        message: err.message || 'Unknown error',
        code: err.code || 'N/A'
      });
    }

    return () => {
      isMounted = false;
      if (channel) {
        supabase.removeChannel(channel).catch(error => {
          console.error('Error removing channel:', error);
        });
      }
    };
  }, [authUser?.id]);

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser?.id) return;

    // Validate username
    if (!username || username.length < 3 || username.length > 20) {
      setError('Username must be between 3-20 characters');
      return;
    }

    try {
      setLoading(true);
      
      // Verify authentication
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase
        .from('users')
        .update({ username })
        .eq('id', authUser.id);

      if (error) throw error;
      
      // Show success message
      setError('');
      alert('Username updated successfully!');
    } catch (error) {
      const err = error as { message?: string; code?: string; details?: string; hint?: string };
      console.error('Error updating username:', {
        message: err.message || 'Unknown error',
        code: err.code || 'N/A',
        details: err.details || 'No details available',
        hint: err.hint || 'No hint available'
      });
      setError(`Failed to update username: ${err.message || 'Unknown error'}`);
      if (err.message?.includes('permission denied')) {
        setError('Permission denied. Please ensure you are logged in.');
      } else if (err.message?.includes('duplicate key')) {
        setError('Username already taken. Please choose another.');
      } else {
        setError('Failed to update username. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture || !authUser?.id) return;

    try {
      setUploading(true);
      const fileExt = profilePicture.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `profile-pictures/${authUser.id}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, profilePicture);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update user profile with new picture URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_picture_url: publicUrl })
        .eq('id', authUser.id);

      if (updateError) throw updateError;

      // Show success message
      setError('');
      alert('Profile picture updated successfully!');
      setProfilePicture(null);
    } catch (error) {
      const err = error as { message?: string; code?: string; details?: string; hint?: string };
      console.error('Error uploading profile picture:', {
        message: err.message || 'Unknown error',
        code: err.code || 'N/A',
        details: err.details || 'No details available',
        hint: err.hint || 'No hint available'
      });
      setError(`Failed to upload profile picture: ${err.message || 'Unknown error'}`);
      if (err.message?.includes('permission denied')) {
        setError('Permission denied. Please ensure you are logged in.');
      } else if (err.message?.includes('invalid file')) {
        setError('Invalid file type. Please upload an image.');
      } else {
        setError('Failed to upload profile picture. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
        Profile
      </h1>
      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
          {error}
        </div>
      )}
      {authUser ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Account Information
            </h2>
            <div className="space-y-4">
              {userData?.profile_picture_url && (
                <div className="flex justify-center">
                  <img 
                    src={userData.profile_picture_url} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {profilePicture && (
                  <button
                    onClick={handleProfilePictureUpload}
                    disabled={uploading}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Picture'}
                  </button>
                )}
              </div>
              <form onSubmit={handleUsernameUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Choose a username"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Username'}
                </button>
              </form>
              <div className="space-y-2 text-gray-600">
                <p>Email: {authUser.email}</p>
                {userData && (
                  <>
                    <p>Full Name: {userData.full_name || 'Not provided'}</p>
                    <p>Points: {userData.points}</p>
                    <p>Member Since: {new Date(userData.created_at).toLocaleDateString()}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Account Settings
            </h2>
            <div className="text-gray-600">
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600">
            Please log in to view your profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
