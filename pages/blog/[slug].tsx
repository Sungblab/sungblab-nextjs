import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Layout } from "../../components/Components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Giscus from "@giscus/react";
import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaCopy,
  FaShare,
  FaArrowLeft,
} from "react-icons/fa";

interface BlogPostProps {
  frontMatter: {
    title: string;
    date: string;
  };
  mdxSource: MDXRemoteSerializeResult;
  toc: TocItem[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const MDXComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-10 mb-6 text-gray-800" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-700" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-medium mt-6 mb-3 text-gray-600" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 text-gray-600 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside my-6 text-gray-600" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside my-6 text-gray-600" {...props} />
  ),
  li: (props: any) => <li className="my-2" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline" {...props} />,
  code: (props: any) => (
    <code
      className="bg-gray-100 rounded px-2 py-1 font-mono text-sm text-pink-500"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-gray-100 rounded p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  img: (props: any) => (
    <span className="block my-8">
      <Image
        {...props}
        width={700}
        height={400}
        layout="responsive"
        objectFit="cover"
        alt={props.alt || "blog image"}
        className="rounded-lg shadow-md"
      />
    </span>
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600"
      {...props}
    />
  ),
};

const BlogPost: NextPage<BlogPostProps> = ({ frontMatter, mdxSource, toc }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollButtons(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const copyPostUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("게시글 주소가 클립보드에 복사되었습니다.");
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator
        .share({
          title: frontMatter.title,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("공유 기능이 지원되지 않는 브라우저입니다.");
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`${frontMatter.title} | Sungblab's Blog`}</title>
      </Head>
      <div className="flex flex-col lg:flex-row container mx-auto px-4 sm:px-6 lg:px-4">
        <div className="w-full">
          <article className="prose lg:prose-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
              {frontMatter.title}
            </h1>
            <p className="text-gray-500 mb-6">{frontMatter.date}</p>
            <div className="flex space-x-4 mb-8">
              <Link
                href="/blog"
                className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
              </Link>
              <button
                onClick={copyPostUrl}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                <FaCopy className="mr-2" /> 주소 복사
              </button>
              <button
                onClick={sharePost}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                <FaShare className="mr-2" /> 공유하기
              </button>
            </div>
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </article>
          <div className="mt-6">
            <Giscus
              repo="Kimsungbin1/sungblab-nextjs"
              repoId="R_kgDOMs0-6A"
              category="Announcements"
              categoryId="DIC_kwDOMs0-6M4CiQTH"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="light"
              lang="ko"
            />
          </div>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />
      {showScrollButtons && (
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={scrollToTop}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
            aria-label="Scroll to bottom"
          >
            <FaArrowDown />
          </button>
        </div>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".mdx", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${params?.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  // Extract TOC from content
  const toc = content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.split(" ")[0].length;
      const text = line.replace(/^#+\s/, "");
      const id = text.toLowerCase().replace(/\s/g, "-");
      return { id, text, level };
    });

  return {
    props: {
      frontMatter: {
        title: data.title as string,
        date: data.date as string,
      },
      mdxSource,
      toc,
    },
  };
};

export default BlogPost;
