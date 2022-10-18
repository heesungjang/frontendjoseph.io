// React & Next
import Head from 'next/head';
import type { AppProps } from 'next/app';
// Components
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { Transition } from '../components/Layout/Transition';
// Styles
import 'fontsource-noto-sans-kr';
import theme, { dark as darkTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { ThemeModeProvider, useThemeMode } from '../hooks/useTheme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeModeProvider>
      <CustomApp>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Header />
        <Transition>
          <Component {...pageProps} />
        </Transition>
        <Footer />
      </CustomApp>
    </ThemeModeProvider>
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
