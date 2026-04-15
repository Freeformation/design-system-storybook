import colors from './colors.json';
import spacing from './spacing.json';
import typography from './typography.json';
import shadows from './shadows.json';
import breakpoints from './breakpoints.json';

const tokens = {
  colors,
  spacing,
  typography,
  shadows,
  breakpoints
} as const;

export type Tokens = typeof tokens;
export default tokens;
