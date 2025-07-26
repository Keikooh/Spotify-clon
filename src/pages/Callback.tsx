import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userServices';
import { getAccessToken } from '../services/authServices';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
       const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const verifier = localStorage.getItem('code_verifier');
      const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

      const data = await getAccessToken(code, redirectUri, clientId, verifier)

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const user = await getUserProfile();

        localStorage.setItem('user_id', user.id);
        navigate('/home');
      } else {
        console.error('Error getting token', data);
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <div>Autenticando con Spotify...</div>;
};

export default Callback;
