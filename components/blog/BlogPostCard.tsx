import Link from "next/link";
import { motion } from "framer-motion";
import { Post } from "../../types/post";
import Image from "next/image";
import { stripMarkdown } from "../../utils/textUtils";
import { useRef, useState } from "react";

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
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full"> 
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative h-full flex flex-col rounded-3xl border transition-all duration-300 overflow-hidden ${
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100 shadow-lg hover:shadow-xl"
          }`}
        >
          {/* Spotlight Effect */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
                theme === 'dark' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'
              }, transparent 40%)`,
            }}
          />

          {/* Image Section */}
          <div className="relative p-4 z-20">
            {post.frontmatter.thumbnail ? (
              <div className="w-full overflow-hidden rounded-2xl aspect-video bg-gray-100 dark:bg-gray-800 relative shadow-sm">
                 <div 
                   className="absolute inset-0 bg-center bg-cover blur-xl opacity-50 dark:opacity-30"
                   style={{ backgroundImage: `url(${post.frontmatter.thumbnail})` }}
                />
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={post.frontmatter.title}
                  width={800}
                  height={400}
                  className="relative w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className={`w-full overflow-hidden rounded-2xl aspect-video ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                <span className="text-4xl">📝</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 pt-2 flex flex-col z-20">
            <div className="flex justify-between items-start gap-4 mb-3">
               <h2
                className={`text-xl font-bold leading-tight ${
                  theme === "dark"
                    ? "text-gray-100 group-hover:text-purple-300"
                    : "text-gray-900 group-hover:text-purple-600"
                } transition-colors duration-300`}
              >
                {post.frontmatter.title}
              </h2>
            </div>
            
            <p
              className={`text-sm line-clamp-2 md:line-clamp-3 leading-relaxed flex-1 mb-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stripMarkdown(post.excerpt)}
            </p>

            <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-400 border border-gray-700"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {(post.frontmatter.tags?.length || 0) > 3 && (
                   <span className={`text-xs px-2 py-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                     +{(post.frontmatter.tags?.length || 0) - 3}
                   </span>
                )}
              </div>

              <div className="flex justify-between items-center text-xs font-mono">
                <span
                  className={`${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {post.frontmatter.date}
                </span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold ${
                    theme === "dark"
                      ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
                      : "bg-purple-50 text-purple-700 border border-purple-100"
                  }`}
                >
                  {post.frontmatter.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogPostCard;
