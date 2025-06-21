export const fetchUserPlaylists = async (user_id: string, access_token: string | null) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${ user_id }/playlists `,
      {
        headers: {
          Authorization: `Bearer ${ access_token }`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
