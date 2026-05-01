import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { coreLight, coreDark, taraLight, taraDark, premiumLight, premiumDark } from './muiTheme';
import coreThemeLight from './brands/core/light';
import coreThemeDark from './brands/core/dark';
import taraThemeLight from './brands/tara/light';
import taraThemeDark from './brands/tara/dark';
import premiumThemeLight from './brands/premium/light';
import premiumThemeDark from './brands/premium/dark';
import { useTranslation } from 'react-i18next';

export type Brand = 'core' | 'tara' | 'premium';
export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  brand: Brand;
  mode: ThemeMode;
  setBrand: (brand: Brand) => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  brand: 'core',
  mode: 'light',
  setBrand: () => {},
  setMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getEmotionTheme(brand: Brand, mode: ThemeMode) {
  const themeMap: Record<Brand, Record<ThemeMode, any>> = {
    core: { light: coreThemeLight, dark: coreThemeDark },
    tara: { light: taraThemeLight, dark: taraThemeDark },
    premium: { light: premiumThemeLight, dark: premiumThemeDark },
  };
  return themeMap[brand][mode];
}

function getMuiTheme(brand: Brand, mode: ThemeMode) {
  const themeMap: Record<Brand, Record<ThemeMode, any>> = {
    core: { light: coreLight, dark: coreDark },
    tara: { light: taraLight, dark: taraDark },
    premium: { light: premiumLight, dark: premiumDark },
  };
  return themeMap[brand][mode];
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialBrand?: Brand;
  initialMode?: ThemeMode;
  initialLocale?: string;
}

export default function ThemeProvider({
  children,
  initialBrand = 'core',
  initialMode = 'light',
  initialLocale = 'en',
}: ThemeProviderProps) {
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const { i18n } = useTranslation();

  // Update brand and mode when props change (from Storybook globals)
  useEffect(() => {
    setBrand(initialBrand);
  }, [initialBrand]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (initialLocale && i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale, i18n]);

  const emotionTheme = useMemo(() => getEmotionTheme(brand, mode), [brand, mode]);
  const muiTheme = useMemo(() => getMuiTheme(brand, mode), [brand, mode]);

  const contextValue: ThemeContextType = {
    brand,
    mode,
    setBrand,
    setMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={emotionTheme}>
          <CssBaseline />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
