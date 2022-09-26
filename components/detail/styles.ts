import { motion } from 'framer-motion';
import styled from 'styled-components';
import { media } from '../../styles/media';
import { NotionColorsTypes } from '../../styles/theme';

export const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

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

export const TextSpan = styled.span<{
  styles: {
    color: NotionColorsTypes;
    code: boolean;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
  };
}>`
  font-size: ${(p) => (p.styles.code ? '14px' : '16px')};
  color: ${({ theme, styles: { color, code } }) =>
    code
      ? '#EB1D36'
      : color === 'default'
      ? theme.black
      : theme.notionColors[color]};

  font-weight: ${({ theme, styles: { bold } }) =>
    bold ? theme.fontWeight.bold : theme.fontWeight.normal};

  font-style: ${(p) => (p.styles.italic ? 'italic' : null)};

  text-decoration: ${(p) => (p.styles.underline ? 'underline' : null)};

  text-decoration: ${(p) => (p.styles.strikethrough ? 'line-through' : null)};

  background-color: ${(p) => (p.styles.code ? '#eeebf2' : null)};

  padding: ${(p) => (p.styles.code ? '2px 4px' : null)};

  border-radius: ${(p) => (p.styles.code ? '4px' : null)};
`;

export const H1 = styled.h1`
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl5};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

export const H2 = styled.h2`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl3};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

export const H3 = styled.h3`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl2};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

export const Paragraph = styled.div`
  text-align: justify;
  margin-top: 16px;
`;

export const HR = styled.hr`
  margin-top: 32px;
  color: ${(p) => p.theme.gray};
  opacity: 0.3;
`;

export const LinkText = styled.a`
  font-size: 18px;
  font-weight: ${(p) => p.theme.fontWeight.normal};
  text-decoration: underline;
  text-decoration-color: ${(p) => p.theme.gray};
  color: ${(p) => p.theme.darkgray};
  opacity: 0.8;
`;

export const List = styled.li`
  margin-top: 12px;
`;

export const GoBack = styled.a`
  display: block;
  font-size: ${(p) => p.theme.font.xl};
  color: ${(p) => p.theme.gray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  opacity: 0.8;
  margin-top: 30px;
  cursor: pointer;
`;

export const BlockQuote = styled.blockquote`
  color: ${({ theme }) => theme.darkgray};
  line-height: 2;
  border-left: 5px solid black;
  padding-left: 15px;
`;

export const Created = styled.div`
  margin-top: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray};
  font-size: ${(p) => p.theme.font.xs};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  opacity: 0.8;
`;

export const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: red;
  transform-origin: 0;
`;
