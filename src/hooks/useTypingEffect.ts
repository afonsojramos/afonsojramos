import { useEffect, useRef, useState } from "react";

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

interface UseTypingEffectReturn {
  displayedText: string;
  isComplete: boolean;
  showCursor: boolean;
}

export function useTypingEffect({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCalledComplete = useRef(false);

  // Keep ref updated
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    }

    if (!hasCalledComplete.current) {
      hasCalledComplete.current = true;
      setIsComplete(true);
      onCompleteRef.current?.();
    }
  }, [displayedText, text, speed, started]);

  useEffect(() => {
    if (!isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
    setShowCursor(false);
  }, [isComplete]);

  return { displayedText, isComplete, showCursor };
}
