import Image from "next/image";
import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function BlogImage({
  src,
  alt,
  width,
  height,
  className,
}: BlogImageProps): JSX.Element {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 630}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "blur-sm grayscale" : "blur-0 grayscale-0"}
          ${className || ""}
        `}
        onLoadingComplete={() => setLoading(false)}
        quality={75}
      />
    </div>
  );
}
