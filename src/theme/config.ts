/**
 * Brand and Theme Configuration
 * Defines all available brands and their supported modes
 */

export const AVAILABLE_BRANDS = ['core', 'tara', 'premium'] as const;
export const AVAILABLE_MODES = ['light', 'dark'] as const;

export type Brand = typeof AVAILABLE_BRANDS[number];
export type ThemeMode = typeof AVAILABLE_MODES[number];

export const BRAND_CONFIGS: Record<Brand, { label: string; description: string; primaryColor: string }> = {
  core: {
    label: 'Core',
    description: 'Primary blue brand',
    primaryColor: '#0060f2',
  },
  tara: {
    label: 'Tara',
    description: 'Green brand variant',
    primaryColor: '#14b37f',
  },
  premium: {
    label: 'Premium',
    description: 'Pink/Secondary brand variant',
    primaryColor: '#ff2aa0',
  },
};

export const THEME_MODE_CONFIGS: Record<ThemeMode, { label: string; icon: string }> = {
  light: {
    label: 'Light',
    icon: '☀️',
  },
  dark: {
    label: 'Dark',
    icon: '🌙',
  },
};
