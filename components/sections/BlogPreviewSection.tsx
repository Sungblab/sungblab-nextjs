import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ArrowRight } from "lucide-react";
import type { Post } from "../../types/post";

interface BlogPreviewSectionProps {
  posts: Post[];
}

function stripMdx(text: string): string {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  posts,
}) => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-blog-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayPosts = posts.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-terracotta text-sm font-medium tracking-wide uppercase">
              Blog
            </span>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-bold tracking-tight">
              {translate("blog.title")}
            </h2>
          </div>
          <Link
            href="/blog"
            className={`hidden md:flex items-center gap-1 text-sm font-medium transition-colors ${
              isDark
                ? "text-warm-500 hover:text-terracotta"
                : "text-warm-700 hover:text-terracotta"
            }`}
          >
            {translate("blog.viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayPosts.map((post, idx) => (
            <motion.div key={post.slug} data-blog-card whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/blog/${post.slug}`}
                className={`group block rounded-xl border transition-all duration-200 hover:shadow-lg h-full overflow-hidden ${
                  isDark
                    ? "bg-warm-800 border-warm-850 hover:border-warm-700"
                    : "bg-white border-warm-200 hover:border-warm-300"
                }`}
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${
                  idx === 0
                    ? "bg-gradient-to-r from-terracotta to-terracotta-light"
                    : idx === 1
                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                }`} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono ${
                        isDark ? "text-warm-600" : "text-warm-500"
                      }`}
                    >
                      {post.frontmatter.date}
                    </span>
                    {post.frontmatter.category && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isDark
                            ? "bg-terracotta/10 text-terracotta-light"
                            : "bg-terracotta-bg text-terracotta"
                        }`}
                      >
                        {post.frontmatter.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-base line-clamp-2 group-hover:text-terracotta transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <p
                    className={`mt-2.5 text-sm line-clamp-3 leading-relaxed ${
                      isDark ? "text-warm-500" : "text-warm-700"
                    }`}
                  >
                    {post.frontmatter.description || stripMdx(post.excerpt)}
                  </p>
                  <div className={`mt-4 text-xs font-medium flex items-center gap-1 transition-colors ${
                    isDark ? "text-warm-600 group-hover:text-terracotta-light" : "text-warm-400 group-hover:text-terracotta"
                  }`}>
                    Read more →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            {translate("blog.viewAll")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
