// React & Next
import React from 'react';
import Link from 'next/link';

// assets
import { media } from '../../styles/media';

// hooks
import useScrollPosition from '../../hooks/useScrollPosition';

// packages
import styled from 'styled-components';
import Image from 'next/image';

const Header: React.FC = () => {
  const scrollPosition = useScrollPosition();

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <HeaderContent>
        <Link href="/">
          <Nav>Blog</Nav>
        </Link>

        <SearchContainer>
          <SearchInput placeholder="검색 기능은 구현중입니다..." />
          <IconWrapper>
            <Image
              src="/assets/search_icon.png"
              alt="search-box"
              width={15}
              height={15}
            />
          </IconWrapper>
        </SearchContainer>
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

  /* margin-bottom: 40px; */
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
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 170px;
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.darkgray};
  background-color: #f7f6f7;
  border: none;
  height: 36px;
  border-radius: 6px;
  opacity: 0.8;
  :focus {
    outline: none;
    box-shadow: 0 0 4px #c5c4c4;
    ::placeholder {
      color: ${(p) => p.theme.darkgray};
    }
  }
  transition: all 0.2s;
  padding-left: 32px;
  padding-right: 3px;
`;

const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.625;
  margin-top: 24px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  margin-top: 2;
  padding-left: 8px;
  opacity: 0.5;
`;

export default Header;
