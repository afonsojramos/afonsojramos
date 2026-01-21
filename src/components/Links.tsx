import { Box, Text } from "ink";
import { useEffect, useState } from "react";
import { type Link, links } from "../constants/userInfo.js";
import { useTheme } from "../theme/index.js";

interface LinksProps {
  show: boolean;
  onComplete?: () => void;
}

interface LinkItemProps {
  link: Link;
  visible: boolean;
}

function LinkItem({ link, visible }: LinkItemProps) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <Box>
      <Box width={12}>
        <Text color={colors.text.primary} bold>
          {link.label}:
        </Text>
      </Box>
      <Text color={link.color}>{link.url.replace("https://", "")}</Text>
      <Text color={colors.text.muted}> [{link.hotkey}]</Text>
    </Box>
  );
}

export function Links({ show, onComplete }: LinksProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!show) return;

    if (visibleCount < links.length) {
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
    onComplete?.();
  }, [show, visibleCount, onComplete]);

  if (!show) return null;

  return (
    <Box flexDirection="column" marginY={1}>
      {links.map((link, index) => (
        <LinkItem key={link.label} link={link} visible={index < visibleCount} />
      ))}
    </Box>
  );
}
