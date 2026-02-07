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
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostMetadata;
  content: string;
  excerpt: string;
}
