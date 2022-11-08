// React & Next
import React from 'react';

// packages
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterText>Copyright © Frontend Joseph</FooterText>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 60px 0;
`;

const FooterText = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.gray};
`;

export default Footer;
