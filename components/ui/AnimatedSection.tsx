import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

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
  const getVariants = (): Variants => {
    const base = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      },
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...base.hidden, y: 40 },
          visible: { ...base.visible, y: 0 },
        };
      case "down":
        return {
          hidden: { ...base.hidden, y: -40 },
          visible: { ...base.visible, y: 0 },
        };
      case "left":
        return {
          hidden: { ...base.hidden, x: 40 },
          visible: { ...base.visible, x: 0 },
        };
      case "right":
        return {
          hidden: { ...base.hidden, x: -40 },
          visible: { ...base.visible, x: 0 },
        };
      case "none":
      default:
        return base;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={getVariants()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
