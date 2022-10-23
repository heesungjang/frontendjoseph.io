import styled from 'styled-components';
import { media } from '../../styles/media';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.darkgray};
  background-color: ${(p) => p.theme.lightgray};
  border: none;
  height: 36px;
  border-radius: 6px;
  opacity: 0.8;
  :focus {
    ::placeholder {
      color: ${(p) => p.theme.darkgray};
    }
  }
  transition: all 0.2s;
  padding-left: 32px;
  padding-right: 3px;

  ${media.lessThan('md')`
    font-size:16px;
  `};
`;

export const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.625;
  margin-top: 24px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  margin-top: 2;
  padding-left: 8px;
  opacity: 0.5;
`;
