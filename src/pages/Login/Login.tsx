import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabaseClient'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
export const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/success'); // Redirect to home if already logged in
      }
    });

    // Listen for auth state changess
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          if (session) navigate('/success');
          break;
        case 'SIGNED_OUT':
          navigate('/');
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // if (!session) {
  //   return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  // }
  // else {
  //   return (<div>Logged in!</div>)
  // }

  // console.log(supabase);
  const [view, setView] = useState<
    'sign_in' | 'sign_up' | 'forgotten_password'
  >('sign_in');

  return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'apple']}
        showLinks={false}
        view={view}
        redirectTo={
          view === 'forgotten_password'
          // since the redirect link already has the reset-password path, we don't need to add it here
            ? `${window.location.origin}`
            : `${window.location.origin}/success`
        }
      />
      <div>
        {view === 'sign_in' ? (
          <div className="extra-links">
            <button 
            onClick={() => setView('sign_up')}
            className="link-button"
            >Don't have an account? Sign up</button>
            <button
              onClick={() => {
                setView('forgotten_password');
                // Note: The redirectTo will only take effect when the password reset email is sent
                // redirectTo = `${window.location.origin}/reset-password`;
              }}
              className="link-button">
              Forgot your password?
            </button>
          </div>
        ) : view === 'sign_up' ? (
          <div className="extra-links">
            <button onClick={() => setView('sign_in')} className="link-button">
            Already have an account? Sign in
            </button>
          </div>
        ) : (
          // When in forgotten_password view
          <div className="extra-links">
            
            <button
              onClick={() => setView('sign_in')}
              className="link-button"
            >
              Remember your password? Back to Sign in
            </button>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
};
