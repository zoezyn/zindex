import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabaseClient'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'


export const Login = () => {
  // supabase.auth.onAuthStateChange((event, session) => {
  //   setSession(session)
  // })
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/success'); // Redirect to home if already logged in
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
  return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo={`${window.location.origin}/success`}
        // redirectTo={`${window.location.origin}/`}
      />
    </div>
  );
};