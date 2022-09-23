// React & Next
import React from 'react';
import Image from 'next/image';

// pages & components
import { Frontmatter } from '../../pages';

// packages
import styled from 'styled-components';

type DescriptionProps = {
  frontmatter: Frontmatter;
};

const Description: React.FC<DescriptionProps> = ({ frontmatter }) => {
  return (
    <DescriptionWrapper>
      <Title>{frontmatter.title}</Title>
      <DescriptionText>{frontmatter.description}</DescriptionText>
      <SearchContainer>
        <SearchInput placeholder="Search posts..." />
        <IconWrapper>
          <Image
            src="/assets/search_icon.png"
            alt="search-box"
            width={15}
            height={15}
          />
        </IconWrapper>
      </SearchContainer>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div`
  div {
    color: ${(p) => p.theme.gray};
  }
`;
const Title = styled.h1`
  text-transform: capitalize;
  color: ${(p) => p.theme.darkgray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  font-size: ${(p) => p.theme.font.xl5};
`;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 24px;
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
export default Description;
