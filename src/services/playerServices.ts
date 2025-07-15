import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Devices, PlaybackState } from "../interfaces";

export const getAvailableDevices = async (
  accessToken: string
): Promise<Devices> => {
  const { data } = await axiosInstance.get<Devices>("me/player/devices", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const playTrack = async (
  accessToken: string,
  trackUri: string,
  deviceId: string,
  playMode: string,
  isArtists: boolean,
  offSetPosition: number = 0
): Promise<void> => {
  const data = {
    ...(playMode === "context"
      ? { context_uri: trackUri }
      : { uris: [trackUri] }),
    ...(!isArtists && { offset: { position: offSetPosition } }),
    position_ms: 0,
  };

  await axiosInstance.put(`me/player/play?device_id?=${deviceId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPlaybackState = async (
  accessToken: string
): Promise<PlaybackState> => {
  const { data } = await axiosInstance.get<PlaybackState>("me/player", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const setPlaybackVolume = async (
  accessToken: string,
  volumePercent: number,
  deviceId: string
): Promise<void> => {
  await axiosInstance.put("me/player/volume", null, {
    params: {
      volume_percent: volumePercent,
      device_id: deviceId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const skipTo = async (
  accessToken: string,
  deviceId: string,
  direction: "previous" | "next"
): Promise<void> => {
  await axiosInstance.post(`me/player/${direction}`, null, {
    params: {
      device_id: deviceId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const togglePlaybackShuffle = async (
  accessToken: string,
  deviceId: string,
  state: boolean
): Promise<void> => {
  await axiosInstance.put("me/player/shuffle", null, {
    params: {
      device_id: deviceId,
      state: state,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const setRepeatMode = async (
  accessToken: string,
  deviceId: string,
  state: "context" | "track" | "off"
): Promise<void> => {
  await axiosInstance.put("me/player/repeat", null, {
    params: {
      device_id: deviceId,
      state: state,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
