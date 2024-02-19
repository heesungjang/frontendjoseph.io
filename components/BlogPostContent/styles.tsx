import Link from 'next/link';
import styled from 'styled-components';
import { media } from '../../styles/media';
import { H1 } from '../Block/styles';

export const ArticleWrapper = styled.article`
  width: calc(100% - 40px);
  line-height: 1.5;
  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  
  `};
`;

export const GoBack = styled(Link)`
  display: block;
  width: fit-content;
  font-size: ${(p) => p.theme.font.xl};
  color: ${(p) => p.theme.gray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  opacity: 0.8;
  margin-top: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

export const H1Title = styled(H1)`
  margin-top: 0px;
  span {
    font-size: ${(p) => p.theme.font.xl5};
  }
`;

export const Created = styled.div`
  margin-top: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray};
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  opacity: 0.8;
`;
