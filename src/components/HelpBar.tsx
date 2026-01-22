import { Box, Text } from "ink";
import { useTheme } from "../theme/index.js";

interface HelpBarProps {
  show: boolean;
}

export function HelpBar({ show }: HelpBarProps) {
  const { colors } = useTheme();

  if (!show) return null;

  const hints = [
    { key: "j/k", action: "navigate" },
    { key: "enter", action: "select" },
    { key: "g/l/w/c", action: "links" },
    { key: "e", action: "email" },
    { key: "q", action: "quit" },
  ];

  return (
    <Box marginTop={1} flexDirection="row" gap={2}>
      {hints.map((hint) => (
        <Box key={hint.key}>
          <Text color={colors.accent}>{hint.key}</Text>
          <Text color={colors.text.muted}> {hint.action}</Text>
        </Box>
      ))}
    </Box>
  );
}
