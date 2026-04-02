import { ChangeEvent } from "react";
import { useLanguage } from "../features/LanguageContext";

interface BlogSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  theme: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  searchTerm,
  onSearch,
  theme,
}) => {
  const { translate } = useLanguage();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={translate("blog.searchPlaceholder") || "Search posts..."}
        className={`w-full p-4 pr-12 rounded-xl border ${
          theme === "dark"
            ? "bg-warm-800/50 text-white border-warm-850 placeholder-warm-500 focus:border-terracotta/50"
            : "bg-white/80 text-warm-800 border-warm-200 placeholder-warm-500 focus:border-terracotta-light/50"
        } focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "focus:ring-terracotta/30"
            : "focus:ring-terracotta-bg0/30"
        } backdrop-blur-sm transition-all duration-300`}
        value={searchTerm}
        onChange={handleSearch}
      />
      <svg
        aria-hidden="true"
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === "dark" ? "text-terracotta-light" : "text-terracotta-bg0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default BlogSearch;
