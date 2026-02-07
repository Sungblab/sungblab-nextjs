interface BlogCategoriesProps {
  categories: Array<{
    id: string;
    label: string;
  }>;
  selectedCategory: string;
  onCategorySelect: (_: string) => void;
  theme: string;
}

const BlogCategories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  theme,
}: BlogCategoriesProps): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category: { id: string; label: string }): JSX.Element => (
        <button
          key={category.id}
          onClick={(): void => onCategorySelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            selectedCategory === category.id
              ? theme === "dark"
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-purple-600 text-white border-purple-600"
              : theme === "dark"
              ? "bg-gray-800/40 text-gray-300 hover:bg-gray-700/50 border-gray-700/50 hover:border-purple-700/50"
              : "bg-white/80 text-gray-600 hover:bg-gray-50 border-gray-200/50 hover:border-purple-300/50"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
