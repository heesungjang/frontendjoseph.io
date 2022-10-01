import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MainWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;
