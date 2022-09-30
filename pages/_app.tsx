import type { AppProps } from 'next/app';
import theme from '../styles/theme';
import { FontStyles, GlobalStyle } from '../styles/GlobalStyle';

import { ThemeProvider } from 'styled-components';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <FontStyles />
      <ThemeProvider theme={theme}>
        <Header />
        <Transition>
          <Component {...pageProps} />
        </Transition>
        <Footer />
      </ThemeProvider>
    </>
  );
}

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Transition: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
