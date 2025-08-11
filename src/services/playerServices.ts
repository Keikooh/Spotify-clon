import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Devices, PlaybackState } from "../interfaces";
import { MediaItems, PlayModes, type MediaItem, type PlaySettings } from "../shared/types/common";

export const getAvailableDevices = async (): Promise<Devices> => {
  const { data } = await axiosInstance.get<Devices>("me/player/devices");

  return data;
};

export const playTrack = async (
  deviceId: string,
  settings: PlaySettings
): Promise<void> => {

  const { uri, playMode, mediaItem, progress, offSetPosition, } = settings

  const body = {
    ...(playMode === PlayModes.Context
      ? { context_uri: uri }
      : { uris: [uri] }),
    ...( mediaItem !== MediaItems.Artist && { offset: { position: offSetPosition } }),
    position_ms: progress,
  };

  await axiosInstance.put('me/player/play', body, {
    params: {
      device_id: deviceId
    }
  });
};

export const getPlaybackState = async (): Promise<PlaybackState> => {
  const { data } = await axiosInstance.get<PlaybackState>("me/player");

  return data;
};

export const setPlaybackVolume = async (
  volumePercent: number,
  deviceId: string
): Promise<void> => {
  await axiosInstance.put("me/player/volume", null, {
    params: {
      volume_percent: volumePercent,
      device_id: deviceId,
    },
  });
};

export const skipTo = async (
  deviceId: string,
  direction: "previous" | "next"
): Promise<void> => {
  await axiosInstance.post(`me/player/${direction}`, null, {
    params: {
      device_id: deviceId,
    },
  });
};

export const togglePlaybackShuffle = async (
  deviceId: string,
  state: boolean
): Promise<void> => {
  await axiosInstance.put("me/player/shuffle", null, {
    params: {
      device_id: deviceId,
      state: state,
    },
  });
};

export const setRepeatMode = async (
  deviceId: string,
  state: "context" | "track" | "off"
): Promise<void> => {
  await axiosInstance.put("me/player/repeat", null, {
    params: {
      device_id: deviceId,
      state: state,
    },
  });
};

export const pausePlayerBack = async (deviceId: string): Promise<void> => {
  await axiosInstance.put("me/player/pause", null, {
    params: {
      device_id: deviceId,
    },
  });
};
