import { ChangeEvent } from "react";

interface BlogSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  theme: string;
}

const BlogSearch = ({
  searchTerm,
  onSearch,
  theme,
}: BlogSearchProps): JSX.Element => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="포스트 검색..."
        className={`w-full p-4 pr-12 rounded-xl border ${
          theme === "dark"
            ? "bg-gray-800/80 text-white border-gray-700 placeholder-gray-400"
            : "bg-white text-gray-800 border-gray-200 placeholder-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
        value={searchTerm}
        onChange={handleSearch}
      />
      <svg
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
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
