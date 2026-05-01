import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

function ThemeSwitcherDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { i18n, t } = useTranslation();

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>
        {/* Current Settings */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {t('app.title')}
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2">
                  {t('theme.current', { theme })}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  {t('language.current', { language: i18n.language === 'en' ? 'English' : 'Bengali' })}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Theme Switcher */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('theme.toggle')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant={theme === 'light' ? 'contained' : 'outlined'}
                onClick={() => setTheme('light')}
              >
                {t('theme.light')}
              </Button>
              <Button
                variant={theme === 'dark' ? 'contained' : 'outlined'}
                onClick={() => setTheme('dark')}
              >
                {t('theme.dark')}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Language Switcher */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('language.toggle')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant={i18n.language === 'en' ? 'contained' : 'outlined'}
                onClick={() => i18n.changeLanguage('en')}
              >
                {t('language.english')}
              </Button>
              <Button
                variant={i18n.language === 'bn' ? 'contained' : 'outlined'}
                onClick={() => i18n.changeLanguage('bn')}
              >
                {t('language.bengali')}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Demo Content
            </Typography>
            <Typography variant="body1" paragraph>
              {t('button.submit')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Current theme: <strong>{theme}</strong> | Current language:{' '}
              <strong>{i18n.language === 'en' ? 'English' : 'Bengali'}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

const meta = {
  title: 'Documentation/Theme & Language Switcher',
  component: ThemeSwitcherDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ThemeSwitcherDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeLightEnglish: Story = {
  render: () => <ThemeSwitcherDemo />,
};

export const ThemeDarkEnglish: Story = {
  render: () => <ThemeSwitcherDemo />,
  parameters: {
    themeMode: 'dark',
  },
};

