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

  ${media.greaterThan('md')`
  width: 620px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  `};
`;

export default Footer;
