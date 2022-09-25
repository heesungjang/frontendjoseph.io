import type { AppProps } from 'next/app';
import theme from '../styles/theme';
import { FontStyles, GlobalStyle } from '../styles/GlobalStyle';

import { ThemeProvider } from 'styled-components';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
      duration: 0.75,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
};

const Transition = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
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
