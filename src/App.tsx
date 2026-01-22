import { Box } from "ink";
import { memo, useCallback, useState } from "react";
import { Card } from "./components/Card.js";
import { Dance } from "./components/Dance.js";
import { Header } from "./components/Header.js";
import { HelpBar } from "./components/HelpBar.js";
import { Links } from "./components/Links.js";
import { Menu } from "./components/Menu.js";
import { ThemeContext, theme } from "./theme/index.js";

interface AppProps {
  onExit: () => void;
}

const MemoHeader = memo(Header);
const MemoLinks = memo(Links);
const MemoHelpBar = memo(HelpBar);

export function App({ onExit }: AppProps) {
  const [headerComplete, setHeaderComplete] = useState(false);
  const [linksComplete, setLinksComplete] = useState(false);
  const [isDancing, setIsDancing] = useState(false);

  const handleHeaderComplete = useCallback(() => {
    setHeaderComplete(true);
  }, []);

  const handleLinksComplete = useCallback(() => {
    setLinksComplete(true);
  }, []);

  const handleStartDance = useCallback(() => {
    // Clear terminal and scrollback buffer for clean dance display
    process.stdout.write("\x1b[2J\x1b[3J\x1b[H");
    setIsDancing(true);
  }, []);

  const handleStopDance = useCallback(() => {
    // Clear terminal and scrollback buffer to remove any leftover dance frames
    process.stdout.write("\x1b[2J\x1b[3J\x1b[H");
    setIsDancing(false);
  }, []);

  if (isDancing) {
    return (
      <ThemeContext.Provider value={theme}>
        <Dance onExit={handleStopDance} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Box flexDirection="column" padding={1}>
        <Card>
          <MemoHeader onTypingComplete={handleHeaderComplete} />
          <MemoLinks show={headerComplete} onComplete={handleLinksComplete} />
          <Menu show={linksComplete} onExit={onExit} onStartDance={handleStartDance} />
        </Card>
        <MemoHelpBar show={linksComplete} />
      </Box>
    </ThemeContext.Provider>
  );
}
