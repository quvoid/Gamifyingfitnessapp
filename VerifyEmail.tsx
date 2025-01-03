import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (token && type === 'signup') {
        const email = searchParams.get('email');
        if (email) {
          const { data, error } = await supabase.auth.verifyOtp({
            type: 'signup',
            email,
            token,
            options: {
              redirectTo: 'http://localhost:5188/verify-email'
            }
          });

          console.log('Email verification response:', data, error);
          
          if (error) {
            console.error('Email verification error:', error);
            if (error.message.includes('expired')) {
              setVerificationStatus('The verification link has expired. Please request a new one.');
            } else {
              setVerificationStatus('Verification failed. Please try again.');
            }
            return;
          }
          
          // Confirm email verification
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError || !user) {
            console.error('Error getting user:', userError?.message);
            setVerificationStatus('Verification failed. Please try again.');
            return;
          }

          // Update user metadata
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              height: parseFloat(searchParams.get('height') || '0'),
              weight: parseFloat(searchParams.get('weight') || '0'),
              bmi: parseFloat(searchParams.get('bmi') || '0'),
              updated_at: new Date().toISOString()
            });

          if (profileError) {
            console.error('Error updating profile:', profileError.message);
          }

          // Show verification success message before redirect
          setVerificationStatus('Your email has been successfully verified!');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {verificationStatus ? 'Email Verified!' : 'Verifying Email...'}
        </h1>
        <p className="text-gray-600">
          {verificationStatus || 'Please wait while we verify your email address'}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
