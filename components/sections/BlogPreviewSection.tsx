import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../../components/features/ThemeContext";
import { useLanguage } from "../../components/features/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Post } from "../../types/post";
import { stripMarkdown } from "../../utils/textUtils";

interface BlogPreviewSectionProps {
  posts: Post[];
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  posts,
}) => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/4 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-200'}`} />
      </div>

      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                  theme === "dark" ? "bg-purple-900/30 text-purple-300 border border-purple-700/50" : "bg-purple-100/50 text-purple-700 border border-purple-200"
                }`}
              >
                {translate("blog.latestThoughts")}
              </motion.span>
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {translate("blog.fromTheBlog")}
              </h2>
              <p className={`mt-4 text-lg max-w-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {translate("blog.description")}
              </p>
            </div>
            
            <Link
              href="/blog"
              className={`hidden md:inline-flex items-center gap-2 text-lg font-medium transition-colors ${
                theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
              }`}
            >
              {translate("blog.viewAll")} <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article 
                    className={`h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
                      theme === "dark" 
                        ? "bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600" 
                        : "bg-white hover:shadow-xl border border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {/* Image Container with Zoom Effect */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.frontmatter.thumbnail ? (
                        <Image
                          src={post.frontmatter.thumbnail}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <span className="text-4xl">📝</span>
                        </div>
                      )}
                      <div className={`absolute inset-0 transition-opacity duration-300 ${theme === 'dark' ? 'bg-black/20 group-hover:bg-black/10' : 'bg-black/5 group-hover:bg-transparent'}`} />
                      
                      {/* Floating Category Badge */}
                      <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg backdrop-blur-md ${
                        theme === 'dark' ? 'bg-black/50 text-white' : 'bg-white/80 text-gray-900'
                      }`}>
                        {post.frontmatter.category}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className={`text-sm mb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.frontmatter.date}
                      </div>

                      <h3 className={`text-xl font-bold mb-3 line-clamp-2 leading-tight transition-colors ${
                        theme === 'dark' ? 'text-gray-100 group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-600'
                      }`}>
                        {post.frontmatter.title}
                      </h3>

                      <p className={`text-sm line-clamp-3 mb-6 flex-grow leading-relaxed ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {stripMarkdown(post.excerpt)}
                      </p>

                      <div className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${
                        theme === 'dark' ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-700'
                      }`}>
                        {translate("blog.readMore")} 
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/blog"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors ${
                theme === "dark" 
                ? "bg-gray-800 text-white hover:bg-gray-700" 
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {translate("blog.viewAll")}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
