// React & Next
import React from 'react';

// styles
import { media } from '../../styles/media';

// packages
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterText>Copyright © Heesung Jang</FooterText>
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

const FooterText = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.gray};
`;

export default Footer;
