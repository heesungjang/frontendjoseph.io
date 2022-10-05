import { motion, useScroll } from 'framer-motion';
import styled from 'styled-components';

export const AnimatedProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <ProgressBar
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
};

export const ProgressBar = styled(motion.div)`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: #cdf0ea;
  opacity: 0.8;
  /* backdrop-filter: blur(12px); */
  transform-origin: 0;
`;
