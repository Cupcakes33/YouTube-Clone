const convertVideoDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
    return "Invalid duration";
  }

  const hoursStr = (match[1] ?? "").replace("H", "") || "0";
  const minutesStr = (match[2] ?? "").replace("M", "") || "0";
  const secondsStr = (match[3] ?? "").replace("S", "") || "0";

  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
};

const formatViewCount = (viewCount: string): string => {
  const formatter = new Intl.NumberFormat("ko-KR", {
    notation: "compact",
  });
  return formatter.format(parseInt(viewCount, 10));
};

export { convertVideoDuration, formatViewCount };