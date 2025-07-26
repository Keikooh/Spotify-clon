import { axiosAuthInstance } from "./axiosAuthInstance";

// Interfaces
import type { SpotifyAuthResponse } from "../interfaces/spotifyAuthResponse";

export const getAccessToken = async (
  code: string,
  redirectUri: string,
  clientId: string,
  codeVerifier: string
): Promise<SpotifyAuthResponse> => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  });
  const { data } = await axiosAuthInstance.post<SpotifyAuthResponse>(
    "token",
    body
  );

  return data;
};

export const getRefreshToken = async (
  refreshToken: string,
  clientId: string
): Promise<SpotifyAuthResponse> => {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });
  const { data } = await axiosAuthInstance.post<SpotifyAuthResponse>(
    "token",
    body
  );

  return data;
};
