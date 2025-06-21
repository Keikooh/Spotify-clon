export const formatTime = (ms): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatTimeSeconds = (s): string => {
  const minutes = Math.floor(s / 60);
  const seconds = s - 60 * minutes;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatDate = (date): string => {
  const newDate = new Date(date);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${newDate.getDate()} ${
    months[newDate.getMonth()]
  }, ${newDate.getFullYear()}`;
};
