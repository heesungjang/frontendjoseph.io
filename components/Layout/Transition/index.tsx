import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

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

export const Transition: React.FC<{
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
