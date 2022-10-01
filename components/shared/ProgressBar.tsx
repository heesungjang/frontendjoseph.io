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
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: red;
  transform-origin: 0;
`;
