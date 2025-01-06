import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface MathProps {
  math: string;
  block?: boolean;
}

const Math: React.FC<MathProps> = ({ math, block = false }) => {
  return block ? <BlockMath math={math} /> : <InlineMath math={math} />;
};

export default Math;
