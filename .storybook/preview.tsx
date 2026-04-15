import React from 'react';
import { withTests } from '@storybook/addon-vitest';
import { Preview } from '@storybook/react';
import '../src/i18n';
import ThemeProvider from '../src/theme/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true }
  }
};

export default preview;
