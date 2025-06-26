import { generateCodeVerifier, generateCodeChallenge } from "../../utils/pkce";

const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri: string = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scope: string = [
  "user-read-private",
  "user-read-email",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-top-read",
].join(" ");

export const handleClick = async () => {
  const verifier = generateCodeVerifier();
  localStorage.setItem("code_verifier", verifier);
  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};
