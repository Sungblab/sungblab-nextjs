import React, { useMemo } from "react";
import { useTheme } from "./ThemeContext";

interface ContentDisplayProps {
  content: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const { theme } = useTheme();

  // Simplified content display without complex replace logic for now
  // to avoid Hydration issues with replacing strings with React components.
  // Ideally, MDX should be used for this.
  
  return (
    <div
      className={`blog-content ${
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      } prose prose-lg max-w-none`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ContentDisplay;
