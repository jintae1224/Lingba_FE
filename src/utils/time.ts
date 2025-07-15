// 업데이트 시간 포맷팅
const formatUpdatedTime = (updatedAt: string | null | undefined) => {
  if (!updatedAt) return "방금 전";

  const now = new Date();
  const updated = new Date(updatedAt);
  const diffInHours = Math.floor(
    (now.getTime() - updated.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "방금 전";
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
  return updated.toLocaleDateString();
};

export default formatUpdatedTime;
