import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Layout } from "../../components/Components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Head>
        <title>Sungblab's Blog</title>
        <meta
          name="description"
          content="Sungblab's blog posts about web development and technology"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Blog Posts
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      excerpt: content.slice(0, 150) + "...",
    };
  });

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
