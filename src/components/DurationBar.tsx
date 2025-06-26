import { useEffect, useState } from "react";
import { formatTime, formatTimeSeconds } from "../utils/formats";
import { usePlayerStore } from "../app/store";

const DurationBar = () => {
  const player = usePlayerStore((state) => state.player);

  const {
    track: { duration: duration_ms, progress: progress_ms },
    isPlaying,
  } = player;

  const duration = isPlaying ? Math.floor(duration_ms / 1000) : 0;
  const [progress, setProgress] = useState(progress_ms);
  const [progressFormat, setProgressFormat] = useState("");

  const [isFinished, setisFinished] = useState(false);
  const time = formatTime(duration_ms);

  useEffect(() => {
    setProgress(Math.floor(progress_ms / 1000));
    setisFinished(false);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < duration ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [player.track]);

  useEffect(() => {
    setProgressFormat(formatTimeSeconds(progress));
    if (progress === duration) {
      setisFinished(true);
      // Obtener status del payer y setear en el store la cancion
    }
  }, [progress]);

  useEffect(() => {}, [isFinished]);

  const percentage = (progress / duration) * 100;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{isFinished ? "0:00" : progressFormat}</span>
      <div className="w-full h-1 bg-gray-700 rounded-full">
        {duration > 0 && !isFinished && (
          <div
            className="h-1 bg-white rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          ></div>
        )}
      </div>
      <span>{time}</span>
    </div>
  );
};

export default DurationBar;
