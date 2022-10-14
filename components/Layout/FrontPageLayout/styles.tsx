import styled from 'styled-components';
import { media } from '../../../styles/media';

export const NoSearchPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const NoSearchPostText = styled.span`
  font-size: ${(p) => p.theme.font.xl};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  color: ${(p) => p.theme.gray};
`;

export const ContentWrapper = styled.div<{ loading: string }>`
  opacity: ${(p) => (p.loading === 'true' ? 0.6 : undefined)};
  position: 'relative';
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: calc(100% - 40px);
  transition: all 0.1s linear;

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  
  `};
`;

export const MainContentsContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

export const MainContents = styled.div`
  width: 100%;
`;

export const EmptySpaceHolder = styled.div`
  flex: 1 1 auto;
`;

export const Divider = styled.hr<{ mt: number; w?: string; mb?: string }>`
  width: ${(p) => (p.w ? p.w : '100%')};
  opacity: 0.2;
  margin-top: ${(p) => p.mt}px;
  margin-bottom: ${(p) => (p.mb ? p.mb : null)};
`;

export const SideTapContainer = styled.div`
  position: relative;
`;
