import { useEffect, useState } from "react";
import { formatTime, formatTimeSeconds } from "../utils/formats";

const DurationBar = ({ data }) => {
  
  const { duration, progress, isPlaying } = data
  const totalSeconds = Math.floor(duration / 1000); // convertir ms a segundos
  const [progressbar, setProgress] = useState(progress);
  const [progressFormat, setProgressFormat] = useState("");

  const time = formatTime(duration);

  useEffect(() => {
    setProgress(0);
  }, [duration]);

  useEffect(() => {
    setProgressFormat(formatTimeSeconds(progressbar));
    if( progressbar === totalSeconds ){
      setProgress(0);
    }
  }, [progressbar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < totalSeconds ? prev + 1 : prev));
    }, 1000);

    
    return () => clearInterval(interval);
  }, [totalSeconds]);

  const percentage = (progressbar / totalSeconds) * 100;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{progressFormat}</span>
      <div className="w-full h-1 bg-gray-700 rounded-full">
        {duration > 0 && (
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
