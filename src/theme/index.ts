import { createContext, useContext } from "react";
import { colors, gradientColors } from "./colors.js";

export interface Theme {
  colors: typeof colors;
  gradientColors: typeof gradientColors;
}

export const theme: Theme = {
  colors,
  gradientColors,
};

export const ThemeContext = createContext<Theme>(theme);

export const useTheme = () => useContext(ThemeContext);

export { colors, gradientColors };
