import { Box, Text, useInput } from "ink";
import open from "open";
import { useCallback, useState } from "react";
import { links, menuActions, userInfo } from "../constants/userInfo.js";
import { useTheme } from "../theme/index.js";
import { Dance } from "./Dance.js";

interface MenuProps {
  show: boolean;
  onExit: () => void;
}

export function Menu({ show, onExit }: MenuProps) {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDancing, setIsDancing] = useState(false);

  const stopDancing = useCallback(() => {
    setIsDancing(false);
  }, []);

  useInput(
    (input, key) => {
      if (!show || isDancing) return;

      // Vim-style navigation (clamped)
      if (input === "j" || key.downArrow) {
        setSelectedIndex((prev) => Math.min(prev + 1, menuActions.length - 1));
        return;
      }
      if (input === "k" || key.upArrow) {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      // Select with Enter
      if (key.return) {
        const action = menuActions[selectedIndex];
        if (action.value === "email") {
          open(`mailto:${userInfo.email}`);
          onExit();
        } else if (action.value === "dance") {
          setIsDancing(true);
        } else if (action.value === "quit") {
          onExit();
        }
        return;
      }

      // Quit
      if (key.escape || input === "q") {
        onExit();
        return;
      }

      // Dance hotkey
      if (input === "d") {
        setIsDancing(true);
        return;
      }

      // Link hotkeys
      const linkHotkeys: Record<string, string | undefined> = {
        g: links.find((l) => l.hotkey === "g")?.url,
        l: links.find((l) => l.hotkey === "l")?.url,
        w: links.find((l) => l.hotkey === "w")?.url,
        c: links.find((l) => l.hotkey === "c")?.url,
      };
      const url = linkHotkeys[input.toLowerCase()];
      if (url) {
        open(url);
        return;
      }

      // Email hotkey
      if (input === "e") {
        open(`mailto:${userInfo.email}`);
        onExit();
      }
    },
    { isActive: show && !isDancing },
  );

  if (!show) return null;

  if (isDancing) {
    return <Dance onExit={stopDancing} />;
  }

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text color={colors.text.secondary} dimColor>
        What would you like to do?
      </Text>
      <Box marginTop={1} flexDirection="column">
        {menuActions.map((action, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Box key={action.value}>
              <Text color={isSelected ? colors.primary : colors.text.primary}>
                {isSelected ? ">" : " "} {action.label}
              </Text>
              <Text color={colors.text.muted}> [{action.hotkey}]</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
