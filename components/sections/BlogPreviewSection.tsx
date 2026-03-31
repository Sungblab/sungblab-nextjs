import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { gsap } from "../../utils/gsap";
import { ArrowRight } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
}

interface BlogPreviewSectionProps {
  posts: Post[];
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
      <div className="max-w-6xl mx-auto px-6">
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
                ? "text-[#888] hover:text-terracotta"
                : "text-[#666] hover:text-terracotta"
            }`}
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <motion.div key={post.slug} data-blog-card whileHover={{ y: -4 }}>
              <Link
                href={`/blog/${post.slug}`}
                className={`block rounded-xl p-6 border transition-shadow hover:shadow-lg h-full ${
                  isDark
                    ? "bg-[#1a1a1a] border-[#2a2a2a]"
                    : "bg-white border-warm-200"
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? "text-[#555]" : "text-[#999]"
                  }`}
                >
                  {post.date}
                </span>
                <h3 className="mt-2 font-heading font-bold text-base line-clamp-2">
                  {post.title}
                </h3>
                <p
                  className={`mt-2 text-sm line-clamp-3 ${
                    isDark ? "text-[#888]" : "text-[#666]"
                  }`}
                >
                  {post.excerpt}
                </p>
                {post.category && (
                  <span
                    className={`inline-block mt-4 text-xs px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-terracotta-dark text-terracotta-light"
                        : "bg-terracotta-bg text-terracotta"
                    }`}
                  >
                    {post.category}
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
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
