import Image from 'next/image';
import styled from 'styled-components';
import { NotionColorsTypes } from '../../styles/theme';

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
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl4};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

export const H2 = styled.h2`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl2};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

export const H3 = styled.h3`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl};
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

export const BlockQuote = styled.blockquote`
  color: ${({ theme }) => theme.darkgray};
  line-height: 2;
  border-left: 5px solid black;
  padding-left: 15px;
`;

export const CalloutWrapper = styled.div`
  margin: 20px 0;
  position: relative;
  background-color: ${(p) => p.theme.lightgray};
  padding: 20px 50px;
  border-radius: 8px;
`;

export const CalloutBulb = styled.div`
  position: absolute;
  left: 18px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  height: 100%;
  span {
    position: unset !important;
  }
`;

export const PostImage = styled(Image)`
  object-fit: scale-down;
  width: unset !important;
  position: relative !important;
  height: 100% !important;
`;
