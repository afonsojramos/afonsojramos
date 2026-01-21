import { Box } from "ink";
import { memo, useCallback, useState } from "react";
import { Card } from "./components/Card.js";
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

  const handleHeaderComplete = useCallback(() => {
    setHeaderComplete(true);
  }, []);

  const handleLinksComplete = useCallback(() => {
    setLinksComplete(true);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <Box flexDirection="column" padding={1}>
        <Card>
          <MemoHeader onTypingComplete={handleHeaderComplete} />
          <MemoLinks show={headerComplete} onComplete={handleLinksComplete} />
          <Menu show={linksComplete} onExit={onExit} />
        </Card>
        <MemoHelpBar show={linksComplete} />
      </Box>
    </ThemeContext.Provider>
  );
}
