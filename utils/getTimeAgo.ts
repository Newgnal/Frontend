export function getTimeAgo(updatedAt?: string, createdAt?: string): string {
  const baseTimeString = updatedAt || createdAt;

  if (!baseTimeString) return "";

  const baseTime = new Date(baseTimeString);
  if (isNaN(baseTime.getTime())) return "";

  const now = new Date();
  const diff = (now.getTime() - baseTime.getTime()) / 1000;

  if (diff < 60) {
    return "방금 전";
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`;
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`;
  } else {
    return baseTime.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
