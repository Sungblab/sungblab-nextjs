import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, useTheme } from "../../components/Components";
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
  const { theme } = useTheme();

  const categories = [
    "all",
    ...Array.from(new Set(posts.map((post) => post.frontmatter.category))),
  ];

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
        <title>Sungblab</title>
        <meta
          name="description"
          content="Sungblab's blog posts about web development and technology"
        />
        <meta
          name="keywords"
          content="web development, technology, blog, coding"
        />
        <meta property="og:title" content="Sungblab" />
        <meta
          property="og:description"
          content="Explore web development and technology insights"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungblab.vercel.app/blog" />
        <meta
          name="google-site-verification"
          content="PxfmFDZIIiYW7qK7pk6s17rsBKYeI43cV5s15D5D5Yo"
        />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 py-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Blog Posts
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Search posts..."
            className={`w-full md:w-2/3 p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className={`w-full md:w-1/3 p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
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
        </motion.div>

        <AnimatePresence>
          <motion.div layout className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <motion.h2
                  whileHover={{ scale: 1.0 }}
                  className="text-xl font-semibold mb-2"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`hover:underline ${
                      theme === "dark"
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    {post.frontmatter.title}
                  </Link>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {post.excerpt}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-between items-center"
                >
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {post.frontmatter.date}
                  </p>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`text-xs px-2 py-1 rounded ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {post.frontmatter.category}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.main>
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
