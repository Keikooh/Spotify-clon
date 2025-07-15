import { axiosInstance } from "./axiosInstance";

export const getAccessToken = async (
  code: string,
  redirectUri: string,
  clientId: string,
  codeVerifier: string
) => {
  const body = {
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  };
  const { data } = await axiosInstance.post("token", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};
