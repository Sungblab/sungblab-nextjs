import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  viewportAmount?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  viewportAmount = 0.2,
  ...props
}) => {
  const getHidden = () => {
    switch (direction) {
      case "up":    return { opacity: 0, y: 40 };
      case "down":  return { opacity: 0, y: -40 };
      case "left":  return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
      default:      return { opacity: 0 };
    }
  };

  const getVisible = () => {
    switch (direction) {
      case "up":
      case "down":  return { opacity: 1, y: 0 };
      case "left":
      case "right": return { opacity: 1, x: 0 };
      default:      return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getHidden()}
      whileInView={getVisible()}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: viewportAmount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
