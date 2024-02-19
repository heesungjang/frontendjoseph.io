// React & Next
import type { AppProps } from 'next/app';
// Components
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { Noto_Sans_KR } from 'next/font/google';
// Styles
import theme, { dark as darkTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { ThemeModeProvider, useThemeMode } from '../hooks/useTheme';
import '@fontsource/inter';

const font = Noto_Sans_KR({
  weight: '400',
  subsets: ['latin'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeModeProvider>
      <CustomApp>
        <Header />
        {/* <Transition> */}
        <Component {...pageProps} />
        {/* </Transition> */}
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
      <main className={font.className}>{children}</main>
    </ThemeProvider>
  );
}

export default App;
