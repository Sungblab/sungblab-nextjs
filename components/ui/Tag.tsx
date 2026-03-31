import React from "react";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children, className = "", ...props }) => {
  return (
    <span
      className={`bg-terracotta-500 text-white px-3 py-1 rounded-full text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
