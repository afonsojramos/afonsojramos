import { Box, Text, useInput, useStdout } from "ink";
import { useEffect, useMemo, useState } from "react";
import { danceFrames } from "../assets/frames.js";
import { useTheme } from "../theme/index.js";

const FRAME_WIDTH = 130;
const FRAME_HEIGHT = 36;

interface DanceProps {
  onExit: () => void;
}

function cropFrame(frame: string, termWidth: number, termHeight: number): string {
  const lines = frame.split("\n");

  // If terminal is too small, just return empty or minimal content
  if (termHeight < 5 || termWidth < 10) {
    return "♪";
  }

  // Reserve space for header (1) + footer (1) + some padding
  const availableHeight = Math.min(FRAME_HEIGHT, Math.max(1, termHeight - 4));
  const availableWidth = Math.min(FRAME_WIDTH, Math.max(1, termWidth));

  // Calculate center crop offsets for when terminal is smaller than frame
  const startRow = Math.max(0, Math.floor((FRAME_HEIGHT - availableHeight) / 2));
  const startCol = Math.max(0, Math.floor((FRAME_WIDTH - availableWidth) / 2));

  // Crop vertically first
  const croppedLines = lines.slice(startRow, startRow + availableHeight);

  // Crop horizontally and trim trailing spaces so Ink can center properly
  return croppedLines
    .map((line) => line.padEnd(FRAME_WIDTH).substring(startCol, startCol + availableWidth).trimEnd())
    .join("\n");
}

export function Dance({ onExit }: DanceProps) {
  const { colors } = useTheme();
  const { stdout } = useStdout();
  const [frameIndex, setFrameIndex] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: stdout.columns || 80,
    height: stdout.rows || 24,
  });

  // Listen for resize events
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: stdout.columns || 80,
        height: stdout.rows || 24,
      });
    };

    stdout.on("resize", handleResize);
    return () => {
      stdout.off("resize", handleResize);
    };
  }, [stdout]);

  const croppedFrames = useMemo(
    () => danceFrames.map((frame) => cropFrame(frame, dimensions.width, dimensions.height)),
    [dimensions.width, dimensions.height],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % croppedFrames.length);
    }, 100);
    return () => clearInterval(interval);
  }, [croppedFrames.length]);

  useInput(() => {
    onExit();
  });

  const frameHeight = Math.max(1, dimensions.height - 4);

  return (
    <Box flexDirection="column" width={dimensions.width} height={dimensions.height} overflow="hidden">
      <Box justifyContent="center" width={dimensions.width}>
        <Text color={colors.primary} bold>
          ~ Never gonna give you up! ~
        </Text>
      </Box>
      <Box justifyContent="center" width={dimensions.width} height={frameHeight} overflow="hidden">
        <Text color="#ff6b6b">{croppedFrames[frameIndex]}</Text>
      </Box>
      <Box justifyContent="center" width={dimensions.width}>
        <Text color={colors.text.muted} dimColor>
          Press any key to stop...
        </Text>
      </Box>
    </Box>
  );
}
