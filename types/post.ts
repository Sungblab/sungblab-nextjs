export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  readingTime: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface Post {
  slug: string;
  frontmatter: PostMetadata;
  content: string;
  excerpt: string;
}
