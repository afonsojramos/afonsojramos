import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import { useCallback, useMemo, useState } from "react";
import { userInfo } from "../constants/userInfo.js";
import { useTheme } from "../theme/index.js";
import { TypeWriter } from "./TypeWriter.js";

interface HeaderProps {
  onTypingComplete?: () => void;
}

export function Header({ onTypingComplete }: HeaderProps) {
  const { gradientColors, colors } = useTheme();
  const [nameComplete, setNameComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  const handleTitleComplete = useCallback(() => {
    setTitleComplete(true);
    onTypingComplete?.();
  }, [onTypingComplete]);

  const gradientColorsMemo = useMemo(() => [...gradientColors], [gradientColors]);

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box>
        <TypeWriter text={userInfo.name} speed={40} onComplete={handleNameComplete}>
          {({ displayedText, showCursor }) => (
            <Gradient colors={gradientColorsMemo}>
              <Text bold>
                {displayedText}
                {showCursor ? "_" : ""}
              </Text>
            </Gradient>
          )}
        </TypeWriter>
        {nameComplete && <Text color={colors.text.secondary}> / {userInfo.handle}</Text>}
      </Box>

      {nameComplete && (
        <Box marginTop={0}>
          <TypeWriter
            text={userInfo.title}
            speed={30}
            delay={100}
            color={colors.text.secondary}
            onComplete={handleTitleComplete}
          />
        </Box>
      )}

      {titleComplete && (
        <Box marginTop={1} flexDirection="column">
          <Text color={colors.text.muted} italic>
            {userInfo.tagline}
          </Text>
          <Text color={colors.text.muted} italic>
            {userInfo.subTagline}
          </Text>
        </Box>
      )}
    </Box>
  );
}
