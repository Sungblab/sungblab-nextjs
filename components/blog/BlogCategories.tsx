interface BlogCategoriesProps {
  categories: Array<{
    id: string;
    label: string;
  }>;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
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
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? theme === "dark"
                ? "bg-purple-600 text-white"
                : "bg-purple-500 text-white"
              : theme === "dark"
              ? "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
