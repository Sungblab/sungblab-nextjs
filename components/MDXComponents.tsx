import { MDXProvider } from "@mdx-js/react";
import Math from "./Math";

const components = {
  Math,
};

export function MDXComponents({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
