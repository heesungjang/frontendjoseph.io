import React from 'react';
import { slug } from '../shared/slug';
import { media } from '../styles/media';

// libs
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent></HeaderContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 99;
  width: 100%;
  margin-bottom: 40px;
  justify-content: center;
  background-color: ${(p) => p.theme.bg};
`;

const HeaderContent = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: pink;
  margin: 0 20px;

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  background-color: blue;
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  background-color: red;
  `};
`;

export default Header;
