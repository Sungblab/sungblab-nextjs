import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import styled from "styled-components";

const MathContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;

  /* 기본 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 0.85em;
    padding: 0.5rem 0;

    .katex-display {
      margin: 0.5em 0;
      padding: 0;
      overflow-x: auto;
      overflow-y: hidden;

      /* KaTeX display 모드의 스크롤바 스타일링 */
      scrollbar-width: thin;
      scrollbar-color: rgba(155, 155, 155, 0.5) transparent;

      &::-webkit-scrollbar {
        display: block;
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 2px;
      }
    }

    .katex {
      text-rendering: auto;
      font: normal 1em KaTeX_Main;
      line-height: 1.2;
      text-indent: 0;
    }
  }
`;

interface MathProps {
  math: string;
  block?: boolean;
}

const Math = ({ math, block = false }: MathProps) => {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mathRef.current) {
      const katex = require("katex");
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
    <MathContainer>
      <span ref={mathRef} />
    </MathContainer>
  );
};

export default Math;
