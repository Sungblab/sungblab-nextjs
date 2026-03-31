import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathProps {
  math: string;
  block?: boolean;
}

const Math: React.FC<MathProps> = ({ math, block = false }) => {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect((): void => {
    if (mathRef.current) {
      try {
        katex.render(math, mathRef.current, {
          throwOnError: false,
          displayMode: block,
          strict: false,
          trust: true,
          macros: {
            "\\RR": "\\mathbb{R}",
            "\\NN": "\\mathbb{N}",
            "\\ZZ": "\\mathbb{Z}",
          },
        });
      } catch (error) {
        console.error("KaTeX error:", error);
      }
    }
  }, [math, block]);

  return (
    <div
      className="overflow-x-auto max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:[&_.katex-display]:overflow-x-auto md:[&_.katex-display]:[scrollbar-width:thin]"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <span ref={mathRef} />
    </div>
  );
};

export default Math;
