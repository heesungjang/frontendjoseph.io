// React & Next
import React from 'react';
import Link from 'next/link';

// assets
import { media } from '../../styles/media';

// hooks
import useScrollPosition from '../../hooks/useScrollPosition';

// packages
import styled from 'styled-components';
import Toggle, { ToggleOff, ToggleOn, ToggleSwitch } from '../Toggle';

const Header: React.FC = () => {
  const scrollPosition = useScrollPosition();

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <HeaderContent>
        <Link href="/">
          <Nav>Blog</Nav>
        </Link>
        <Toggle>
          <ToggleSwitch />
          <ToggleOn>Dark Mode</ToggleOn>
          <ToggleOff>Light Mode</ToggleOff>
        </Toggle>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ scrollPosition: number }>`
  top: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  position: sticky;
  color: ${(p) => p.theme.gray};

  justify-content: center;
  /* background-color: rgb(255, 255, 255, 0.7); */

  /* background-color: ${(p) => p.theme.bg}; */
  backdrop-filter: blur(10px);

  border-bottom-color: #ffff;
  border-bottom: ${(p) =>
    p.scrollPosition >= 30 ? `1px solid ${p.theme.lightgray}` : null};
  /* transition: all 0.2s linear; */
`;

const HeaderContent = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  `};
`;

const Nav = styled.span`
  font-size: ${(p) => p.theme.font.lg};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  cursor: pointer;
`;

export default Header;
