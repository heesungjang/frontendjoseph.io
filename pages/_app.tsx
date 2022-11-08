// React & Next
import type { AppProps } from 'next/app';
// Components
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { Transition } from '../components/Layout/Transition';
// Styles
import theme, { dark as darkTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { ThemeModeProvider, useThemeMode } from '../hooks/useTheme';
import { Inter } from '@next/font/google';
const inter = Inter();
function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeModeProvider>
        <CustomApp>
          <Header />
          <Transition>
            <Component {...pageProps} />
          </Transition>
          <Footer />
        </CustomApp>
      </ThemeModeProvider>
    </main>
  );
}

function CustomApp({ children }: { children: React.ReactNode }) {
  const {
    state: { isDark },
  } = useThemeMode();
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default App;
