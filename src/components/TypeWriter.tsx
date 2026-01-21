import { Text } from "ink";
import type { ReactNode } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect.js";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  bold?: boolean;
  onComplete?: () => void;
  children?: (props: { displayedText: string; showCursor: boolean }) => ReactNode;
}

export function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  color,
  bold = false,
  onComplete,
  children,
}: TypeWriterProps) {
  const { displayedText, showCursor } = useTypingEffect({
    text,
    speed,
    delay,
    onComplete,
  });

  if (children) {
    return <>{children({ displayedText, showCursor })}</>;
  }

  return (
    <Text color={color} bold={bold}>
      {displayedText}
      {showCursor && <Text color={color}>_</Text>}
    </Text>
  );
}
