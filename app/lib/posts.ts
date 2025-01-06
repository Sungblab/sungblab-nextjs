type Post = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
};

export async function getPost(slug: string): Promise<Post> {
  // TODO: 실제 데이터베이스나 파일시스템에서 포스트를 가져오는 로직 구현
  return {
    title: "샘플 포스트",
    excerpt: "포스트 요약",
    date: new Date().toISOString(),
    slug: slug,
  };
}
