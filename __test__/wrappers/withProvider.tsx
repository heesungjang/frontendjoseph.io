import React from 'react';
import theme from '../../styles/theme';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeModeProvider } from '../../hooks/useTheme';

export const renderWithThemeProvider = (Component: React.ReactNode) => {
  const utils = render(
    <ThemeModeProvider>
      <ThemeProvider theme={theme}>{Component}</ThemeProvider>
    </ThemeModeProvider>
  );

  return utils;
};
