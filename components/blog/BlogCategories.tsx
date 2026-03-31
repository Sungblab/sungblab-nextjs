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
      {categories.map((category: { id: string; label: string }): JSX.Element => (
        <button
          key={category.id}
          onClick={(): void => onCategorySelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            selectedCategory === category.id
              ? theme === "dark"
                ? "bg-terracotta text-white border-terracotta"
                : "bg-terracotta text-white border-terracotta"
              : theme === "dark"
              ? "bg-[#1a1a1a]/40 text-[#ccc] hover:bg-[#1a1a1a]/70 border-[#2a2a2a]/50 hover:border-terracotta/50"
              : "bg-white/80 text-[#666] hover:bg-warm-50 border-warm-200/50 hover:border-terracotta/50"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
