import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import light from './light';
import dark from './dark';

type ThemeName = 'light' | 'dark';

const ThemeContext = createContext({ theme: 'light' as ThemeName, setTheme: (_: ThemeName) => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const theme = useMemo(() => (themeName === 'light' ? light : dark), [themeName]);

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme: setThemeName }}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}
