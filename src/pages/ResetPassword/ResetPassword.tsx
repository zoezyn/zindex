import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    // Get the hash from the URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    
    if (type === 'recovery') {
      setHash(window.location.hash);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Listen for password update event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    //   console.log('Auth event:', event), For debugging
      
      if (event === 'USER_UPDATED') {
        alert('Password updated successfully!');
        navigate('/login', { replace: true }); // Use replace to prevent back navigation
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="auth-container">
      {hash ? (
        <Auth
          supabaseClient={supabase}
          view="update_password"
          appearance={{
            theme: ThemeSupa,
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}; 