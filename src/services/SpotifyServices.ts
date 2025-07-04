import type { Playlist } from "../models/Playlist";

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

export const getUsersTopItems = async (
  accessToken: string | null,
  type: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/me/top/${type}?limit=5`, {
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
  playMode: "single" | "context",
  isArtist: boolean,
  offsetPosition: number = 0
) => {
  try {
    const body = {
      ...(playMode === "context"
        ? { context_uri: trackUri }
        : { uris: [trackUri] }),
      ...(!isArtist && { offset: { position: offsetPosition } }),
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

export const setPlaybackVolume = async (
  accessToken: string | null,
  volumePercent: number,
  deviceId: string
) => {
  const params = new URLSearchParams({
    volume_percent: volumePercent,
    device_id: deviceId,
  });
  try {
    await fetch(`${API_BASE_URL}/me/player/volume?${params.toString()}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const goTo = async (
  accessToken: string | null,
  deviceId: string,
  direction: "previous" | "next"
) => {
  const params = new URLSearchParams({
    device_id: deviceId,
  });
  try {
    await fetch(`${API_BASE_URL}/me/player/${direction}?${params.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const setShuffleState = async (
  accessToken: string | null,
  deviceId: string,
  state: boolean
) => {
  const params = new URLSearchParams({
    device_id: deviceId,
    state: state,
  });
  try {
    await fetch(`${API_BASE_URL}/me/player/shuffle?${params.toString()}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const setRepeatMode = async (
  accessToken: string | null,
  deviceId: string,
  state: "context" | "track" | "off"
) => {
  const params = new URLSearchParams({
    device_id: deviceId,
    state: state,
  });
  try {
    await fetch(`${API_BASE_URL}/me/player/repeat?${params.toString()}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPlaylist = async (
  accessToken: string | null,
  userId: string,
  playlist: Playlist
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
// Playlist

export const unfollowPlaylist = async (
  accessToken: string | null,
  id: string
) => {
  try {
    await fetch(`${API_BASE_URL}/playlists/${id}/followers`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  } catch (error) {
    console.error("Error getting profile: ", error);
  }
};
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

export const addCustomPlaylistCoverImage = async (
  accessToken: string | null,
  playlistId: string,
  image: string
) => {
  try {
    const body = {
      image,
    };

    await fetch(`${API_BASE_URL}/playlists/${playlistId}/images`, {
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

// Search
export const getSearchResult = async (
  accessToken: string | null,
  value: string,
  filters: string
) => {
  try {
    const params = new URLSearchParams({
      q: value,
      type: filters,
      limit: 20,
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error getting track: ", error);
  }
};

// Artist
export const getArtist = async (accessToken: string | null, id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getArtistsTopTracks = async (
  accessToken: string | null,
  id: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Album

export const getAlbum = async (accessToken: string | null, id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
