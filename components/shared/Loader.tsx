import { motion } from 'framer-motion';
import React from 'react';

const LoadingDot = {
  display: 'block',
  width: '2rem',
  height: '2rem',
  backgroundColor: 'black',
  borderRadius: '50%',
};

const LoadingContainer = {
  width: '10rem',
  height: '5rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

export default function ThreeDotsWave() {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 999,
        top: '50%',
        left: 0,
        right: 'auto',
        paddingTop: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}
