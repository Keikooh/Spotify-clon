import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";
import { spotifyScopes  } from "../config/spotifyScopes";

const LoginComponent = () => {
  const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri: string = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  

  const handleClick = async () => {
    const verifier = generateCodeVerifier(64);
    localStorage.setItem("code_verifier", verifier);
    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: spotifyScopes,
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return <button onClick={handleClick}>Login</button>;
};

export default LoginComponent;
