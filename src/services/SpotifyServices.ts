const API_BASE_URL = "https://api.spotify.com/v1";

// User

export const getProfile = async (accessToken: string | null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error getting profile: ", error);
  }
};

// Player

export const fetchDevices = async (accessToken: string | null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me/player/devices`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const playTrack = async (
  trackUri: string,
  deviceId: string,
  accessToken: string | null,
  playMode: 'single' | 'context',
  isArtist:boolean,
  offsetPosition:number = 0
) => {
  try {
    const body = {
      ...(playMode === 'context' ? { context_uri: trackUri } : { uris: [trackUri] }),
      ...(!isArtist && { offset: { position: offsetPosition}}),
      position_ms: 0,
    };

    await fetch(`${API_BASE_URL}/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlayState = async (accessToken: string | null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me/player`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getRecentlyPlayedTracks = async (accessToken: string | null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me/player/recently-played`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Playlist

export const fetchPlaylist = async (accessToken: string | null, id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
