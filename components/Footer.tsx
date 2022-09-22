import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/media';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <span>power by heesung</span>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  background-color: red;

  ${media.greaterThan('md')`
  width: 620px;
  background-color: blue;
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  background-color: red;
  `};
`;

export default Footer;
