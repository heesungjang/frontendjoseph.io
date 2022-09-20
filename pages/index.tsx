import type { NextPage } from 'next';
import styled from 'styled-components';
import { media } from '../styles/media';

const Home: NextPage = () => {
  return <TestWrapper></TestWrapper>;
};

const TestWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  ${media.greaterThan('sm')`
    background-color:blue
  `}
`;

export default Home;
