import Link from "next/link";
import { motion } from "framer-motion";
import { Post } from "../../types/post";
import Image from "next/image";
import { stripMarkdown } from "../../utils/textUtils";

interface BlogPostCardProps {
  post: Post;
  theme: string;
  index: number;
}

const BlogPostCard = ({
  post,
  theme,
  index,
}: BlogPostCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className={`p-6 rounded-xl ${
            theme === "dark"
              ? "bg-gray-800/50 hover:bg-gray-700/50"
              : "bg-white hover:bg-gray-50"
          } shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {post.frontmatter.thumbnail && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={post.frontmatter.thumbnail}
                alt={post.frontmatter.title}
                width={800}
                height={400}
                className="rounded-t-lg w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="space-y-3">
            <h2
              className={`text-xl font-bold group-hover:text-purple-500 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {post.frontmatter.title}
            </h2>

            <p
              className={`mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {stripMarkdown(post.excerpt)}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {post.frontmatter.date}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  theme === "dark"
                    ? "bg-purple-900/50 text-purple-200"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {post.frontmatter.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogPostCard;