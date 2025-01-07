import { useEffect } from "react";
import "katex/dist/katex.min.css";

interface MathProps {
  math: string;
  block?: boolean;
}

const Math: React.FC<MathProps> = ({ math, block = false }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const renderMath = async () => {
        const katex = (await import("katex")).default;
        const elements = document.getElementsByClassName("math");
        Array.from(elements).forEach((element) => {
          if (
            element instanceof HTMLElement &&
            element.innerHTML.trim() === math
          ) {
            try {
              katex.render(math, element, {
                displayMode: block,
                throwOnError: false,
                output: "html",
                strict: false,
              });
            } catch (error) {
              console.error("KaTeX error:", error);
            }
          }
        });
      };
      renderMath();
    }
  }, [math, block]);

  return (
    <div
      className={`math ${
        block ? "block max-w-full overflow-x-auto py-4" : "inline-block"
      }`}
    >
      {math}
    </div>
  );
};

export default Math;
