import { Preview } from '@storybook/react';
import {ThemeProvider} from '@freeformation/core';

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'core', title: 'Core', right: '🔵' },
          { value: 'tara', title: 'Tara', right: '🟢' },
          { value: 'premium', title: 'Premium', right: '🩷' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Theme mode',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', right: '☀️' },
          { value: 'dark', title: 'Dark', right: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: '🇺🇸' },
          { value: 'bn', title: 'Bengali', right: '🇧🇩' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'core',
    mode: 'light',
    locale: 'en',
  },
  decorators: [
    (Story, context) => {
      const { brand, mode, locale } = context.globals;

      return (
        <ThemeProvider initialBrand={brand} initialMode={mode} initialLocale={locale}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
