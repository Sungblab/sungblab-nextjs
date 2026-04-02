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
          {displayPosts.map((post) => (
            <motion.div key={post.slug} data-blog-card whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/blog/${post.slug}`}
                className={`block rounded-xl p-6 border transition-shadow hover:shadow-lg h-full ${
                  isDark
                    ? "bg-warm-800 border-warm-850"
                    : "bg-white border-warm-200"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-warm-600" : "text-warm-500"
                  }`}
                >
                  {post.frontmatter.date}
                </span>
                <h3 className="mt-2 font-heading font-bold text-base line-clamp-2">
                  {post.frontmatter.title}
                </h3>
                <p
                  className={`mt-2 text-sm line-clamp-3 ${
                    isDark ? "text-warm-500" : "text-warm-700"
                  }`}
                >
                  {post.frontmatter.description || stripMdx(post.excerpt)}
                </p>
                {post.frontmatter.category && (
                  <span
                    className={`inline-block mt-4 text-xs px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-terracotta-dark text-terracotta-light"
                        : "bg-terracotta-bg text-terracotta"
                    }`}
                  >
                    {post.frontmatter.category}
                  </span>
                )}
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
