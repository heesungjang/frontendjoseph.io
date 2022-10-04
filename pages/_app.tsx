// React & Next
import Head from 'next/head';
import { Fragment } from 'react';
import type { AppProps } from 'next/app';
// Components
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { Transition } from '../components/Layout/Transition';
// Styles
import theme, { dark } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Transition>
          <Component {...pageProps} />
        </Transition>
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
