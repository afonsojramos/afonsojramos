import { useInput } from "ink";
import { useCallback, useState } from "react";

interface UseKeyboardNavOptions {
  itemCount: number;
  onSelect?: (index: number) => void;
  hotkeys?: Record<string, () => void>;
  onQuit?: () => void;
}

interface UseKeyboardNavReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export function useKeyboardNav({
  itemCount,
  onSelect,
  hotkeys = {},
  onQuit,
}: UseKeyboardNavOptions): UseKeyboardNavReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleInput = useCallback(
    (
      input: string,
      key: { upArrow: boolean; downArrow: boolean; return: boolean; escape: boolean },
    ) => {
      // Vim-style navigation (clamped, no wrap)
      if (input === "j" || key.downArrow) {
        setSelectedIndex((prev) => Math.min(prev + 1, itemCount - 1));
        return;
      }

      if (input === "k" || key.upArrow) {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      // Select with Enter
      if (key.return) {
        setSelectedIndex((prev) => {
          onSelect?.(prev);
          return prev;
        });
        return;
      }

      // Quit with Escape or q
      if (key.escape || input === "q") {
        onQuit?.();
        return;
      }

      // Custom hotkeys
      const hotkeyAction = hotkeys[input.toLowerCase()];
      if (hotkeyAction) {
        hotkeyAction();
      }
    },
    [itemCount, onSelect, hotkeys, onQuit],
  );

  useInput(handleInput);

  return { selectedIndex, setSelectedIndex };
}
