import React from 'react';
import { slug } from '../shared/slug';
import { media } from '../styles/media';
import GithubIcon from '../public/assets/github.svg';

// libs
import styled from 'styled-components';
import useScrollPosition from '../hooks/useScrollPosition';
import Link from 'next/link';

const Header: React.FC = () => {
  const scrollPosition = useScrollPosition();

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <HeaderContent>
        <GithubIcon width={25} height={25} />
        <Link href="/about">
          <Nav>About</Nav>
        </Link>
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
  color: ${(p) => p.theme.grey};

  margin-bottom: 40px;
  justify-content: center;
  backdrop-filter: blur(8px);
  background-color: rgb(255, 255, 255, 0.7);

  border-bottom-color: #ffff;
  border-bottom: ${(p) =>
    p.scrollPosition >= 30 ? `1px solid #ebebeb` : null};
  transition: all 0.2s linear;
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
  font-weight: ${(p) => p.theme.fontWeight.medium};
  cursor: pointer;
`;

export default Header;
