import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';

const Home: NextPage = () => {
  return <TestWrapper></TestWrapper>;
};

const TestWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

export default Home;
