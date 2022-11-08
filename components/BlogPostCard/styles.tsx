import styled from 'styled-components';
import { NotionColorsTypes } from '../../lib/types';
import { TagSize } from '../../styles/theme';

export const BlogTitle = styled.h2`
  line-height: 1.2;
  font-size: ${(p) => p.theme.font.xl2};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  width: fit-content;
  color: ${(p) => p.theme.default};
`;

export const BlogDescription = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.gray};
  line-height: 1.5;
`;

export const PostInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ tagColor: NotionColorsTypes; size: TagSize }>`
  width: fit-content;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: ${(p) => p.theme.font[p.size]};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: #404040;
  background-color: ${(p) => p.theme.notionColors[p.tagColor]};
  opacity: 0.9;
  cursor: pointer;
`;

export const PostWrapper = styled.div`
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  border-radius: 8px;
  /* padding: 24px; */
  :hover {
    h2 {
      text-decoration-line: underline;
      text-decoration-color: ${(p) => p.theme.gray};
    }
  }
  transition: all 0.2s linear;
  margin-bottom: 40px;
`;
