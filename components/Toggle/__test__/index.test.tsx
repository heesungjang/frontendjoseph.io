import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeModeProvider } from '../../../hooks/useTheme';
import theme from '../../../styles/theme';
import userEvent from '@testing-library/user-event';
import Toggle, { ToggleOff, ToggleOn, ToggleSwitch } from '../index';

describe('Toggle Button', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeModeProvider>
          <Toggle>
            <ToggleSwitch />
            <ToggleOn>Dark Mode</ToggleOn>
            <ToggleOff>Light Mode</ToggleOff>
          </Toggle>
        </ThemeModeProvider>
      </ThemeProvider>
    );
  });
  it('renders a toggle component', () => {
    const toggleComponent = screen.getByTestId('toggle-component');
    const toggleText = screen.getByText(/light mode/i);

    expect(toggleComponent).toBeInTheDocument();
    expect(toggleText).toBeInTheDocument();
  });

  it('toggles current theme mode when clicked', async () => {
    const toggleComponent = screen.getByTestId('toggle-component');
    const toggleButton = screen.getByTestId('toggle-button');

    expect(toggleComponent).toBeInTheDocument();
    expect(screen.getByText(/light mode/i)).toBeInTheDocument();
    await userEvent.click(toggleButton);
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  });
});
