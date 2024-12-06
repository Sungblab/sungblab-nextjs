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

  return {
    slug,
    frontmatter: data as Post["frontmatter"],
    content,
    excerpt: content.slice(0, 150) + "...",
  };
};

export const getAllPosts = (): Post[] => {
  const filePaths = getPostFilePaths();

  const posts = filePaths
    .map((filePath) => {
      const slug = filePath.replace(".mdx", "");
      return getPostBySlug(slug);
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return posts;
};
