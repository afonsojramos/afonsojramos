import { Box, Text, useInput } from "ink";
import { useEffect, useState } from "react";
import { danceFrames } from "../assets/frames.js";
import { useTheme } from "../theme/index.js";

interface DanceProps {
  onExit: () => void;
}

export function Dance({ onExit }: DanceProps) {
  const { colors } = useTheme();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % danceFrames.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useInput(() => {
    onExit();
  });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color={colors.primary} bold>
        ~ Never gonna give you up! ~
      </Text>
      <Text color="#ff6b6b">{danceFrames[frameIndex]}</Text>
      <Text color={colors.text.muted} dimColor>
        Press any key to stop...
      </Text>
    </Box>
  );
}
