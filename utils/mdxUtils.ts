import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types/post";

export const POSTS_PATH = path.join(process.cwd(), "content/blog");

export const getPostFilePaths = (): string[] => {
  return fs.readdirSync(POSTS_PATH);
};

export const getPostBySlug = (slug: string): Post => {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // 썸네일이 없을 경우 본문에서 첫 번째 이미지 추출
  let thumbnail = data.thumbnail;
  if (!thumbnail) {
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imgMatch && imgMatch[1]) {
      thumbnail = imgMatch[1];
    }
  }

  return {
    slug,
    frontmatter: {
      ...(data as Post["frontmatter"]),
      thumbnail: thumbnail || null,
    },
    content,
    excerpt: (data.description || content.slice(0, 150)) + "...",
  };
};

export const getAllPosts = (): Post[] => {
  const filePaths = getPostFilePaths();

  const posts = filePaths
    .map((filePath: string): Post => {
      const slug = filePath.replace(".mdx", "");
      return getPostBySlug(slug);
    })
    .filter((post: Post): boolean => {
      // 배포 환경에서는 드래프트 제외 (로컬 개발 시에는 확인 가능하도록 처리 가능하나 일단 단순화)
      return post.frontmatter.draft !== true;
    })
    .sort((a: Post, b: Post): number => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return posts;
};
