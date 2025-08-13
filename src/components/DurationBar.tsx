import { useEffect, useRef, useState } from "react";
import { formatTimeSeconds } from "../utils/formats";
import { usePlayerbackStore } from "../store/PlayerbackStore";

const DurationBar = () => {
  const playerback = usePlayerbackStore((state) => state.playerback);
  const {
    track: { duration },
    settings: { progress, isPlaying },
  } = playerback;

  const [count, setCount] = useState(Math.floor(progress / 1000));
  const maxCount = Math.floor(duration / 1000);

  // Keep timer reference between renders
  const timer = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const startTimer = () => {
    stopTimer(); // Ensures there is no active timer before starting a new one
    timer.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    setCount(Math.floor(progress / 1000));

    isPlaying ? startTimer() : stopTimer();

    return () => stopTimer(); // Clear timer when the song changes
  }, [playerback.track]);

  useEffect(() => {
    isPlaying ? startTimer() : stopTimer();
    return () => stopTimer(); // Clear timer when the playback state changes (isPlaying)
  }, [isPlaying]);

  useEffect(() => {
    if (count >= maxCount) {
      setCount(0); // If the song has ended, reset the counter and stop the timer
      stopTimer();
    }
  }, [count]);

  const handleSincronizeSong = async () => {};

  return (
    <div className="flex items-center gap-2 text-xs">
      <span>{formatTimeSeconds(count)}</span>
      <input
        type="range"
        className="w-full"
        defaultValue={count}
        min="0"
        max={maxCount}
        onMouseUp={handleSincronizeSong}
      />
      <span>{formatTimeSeconds(maxCount)}</span>
    </div>
  );
};

export default DurationBar;
