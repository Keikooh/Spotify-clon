import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userServices';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const verifier = localStorage.getItem('code_verifier');

      if (!code || !verifier) return;

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: verifier,
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const user = await getUserProfile();

        localStorage.setItem('user_id', user.id);
        navigate('/home');
      } else {
        console.error('Error getting token', data);
      }
    };

    getAccessToken();
  }, [navigate]);

  return <div>Autenticando con Spotify...</div>;
};

export default Callback;
