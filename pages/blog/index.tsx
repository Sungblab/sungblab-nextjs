import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category: string;
  };
  content: string;
  excerpt: string;
}

interface BlogPageProps {
  posts: Post[];
}

const POSTS_PATH = path.join(process.cwd(), "content/blog");

const getAllPosts = (): Post[] => {
  const filenames = fs.readdirSync(POSTS_PATH);

  const posts = filenames.map((filename) => {
    const filePath = path.join(POSTS_PATH, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(".mdx", ""),
      frontmatter: data as Post["frontmatter"],
      content,
      excerpt: content.slice(0, 150) + "...",
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
};

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const categories = [
    "all",
    ...Array.from(new Set(posts.map((post) => post.frontmatter.category))),
  ];

  // null, undefined, 빈 문자열 제거
  const validCategories = categories.filter(Boolean);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        (selectedCategory === "all" ||
          post.frontmatter.category === selectedCategory) &&
        (post.frontmatter.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  return (
    <Layout>
      <Head>
        <title>Sungblab's Blog</title>
        <meta
          name="description"
          content="Sungblab's blog posts about web development and technology"
        />
        <meta
          name="keywords"
          content="web development, technology, blog, coding"
        />
        <meta property="og:title" content="Sungblab's Blog" />
        <meta
          property="og:description"
          content="Explore web development and technology insights"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/blog" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="">Blog Posts</h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full md:w-2/3 p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-1/3 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {validCategories.map((category) => (
              <option key={category} value={category}>
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : "Uncategorized"}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {post.frontmatter.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
