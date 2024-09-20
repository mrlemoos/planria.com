"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "./css";

export interface WordRotateProps extends HTMLMotionProps<"h1"> {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  initial = { opacity: 0, y: -50 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: 50 },
  transition = { duration: 0.25, ease: "easeOut" },
  className,
  ...props
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          {...props}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
