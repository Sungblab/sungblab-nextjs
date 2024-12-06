import { Post } from "../types/post";

export const getRelatedPosts = (
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] => {
  // 현재 포스트 제외
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  // 포스트별 관련도 점수 계산
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    // 같은 카테고리면 높은 점수
    if (post.frontmatter.category === currentPost.frontmatter.category) {
      score += 5;
    }

    // 공통 태그당 점수 추가
    const commonTags = post.frontmatter.tags?.filter((tag) =>
      currentPost.frontmatter.tags?.includes(tag)
    );
    score += (commonTags?.length || 0) * 3;

    // 최신 글일수록 가산점
    const daysDiff = Math.abs(
      (new Date(post.frontmatter.date).getTime() -
        new Date(currentPost.frontmatter.date).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    score += Math.max(0, 10 - daysDiff * 0.1); // 날짜가 가까울수록 높은 점수

    return { post, score };
  });

  // 점수순 정렬 후 상위 n개 반환
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
};
