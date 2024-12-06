import Link from "next/link";
import { Post } from "../../types/post";

interface RelatedPostsProps {
  posts: Post[];
  theme: string;
}

const RelatedPosts = ({ posts, theme }: RelatedPostsProps): JSX.Element => {
  if (posts.length === 0) return <></>;

  return (
    <div className="mt-12">
      <h3
        className={`text-xl font-bold mb-6 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        관련 포스트
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`block p-4 rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800/50 hover:bg-gray-700/50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <h4
              className={`font-medium mb-2 line-clamp-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {post.frontmatter.title}
            </h4>
            <p
              className={`text-sm line-clamp-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  theme === "dark"
                    ? "bg-purple-900/50 text-purple-200"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {post.frontmatter.category}
              </span>
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {post.frontmatter.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
