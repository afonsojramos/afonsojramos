import { Box, type BoxProps } from "ink";
import type { ReactNode } from "react";
import { useTheme } from "../theme/index.js";

interface CardProps extends BoxProps {
  children: ReactNode;
}

export function Card({ children, ...props }: CardProps) {
  const { colors } = useTheme();

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.primary}
      paddingX={2}
      paddingY={1}
      {...props}
    >
      {children}
    </Box>
  );
}
