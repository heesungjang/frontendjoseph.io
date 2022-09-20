import type { AppProps } from 'next/app';
import theme from '../styles/theme';
import { GlobalStyle } from '../styles/GlobalStyle';

import { ThemeProvider } from 'styled-components';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
