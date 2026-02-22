"use client";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
};

export default function TypewriterFade({ text, speed = 40 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="whitespace-pre-line">
      {text.split("").map((char, i) => (
        <span key={i} className={`fade-letter ${i < index ? "visible" : ""}`}>
          {char}
        </span>
      ))}
    </span>
  );
}
