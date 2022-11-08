import styled from 'styled-components';

export const ThreeDContainer = styled.div`
  width: 250px;
  height: 230px;
  position: relative;
  display: flex;
  background-color: transparent;
  justify-content: center;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: flex-end;
  justify-content: space-between;
  div {
    color: ${(p) => p.theme.gray};
  }
`;
export const Title = styled.h1`
  text-transform: capitalize;
  color: ${(p) => p.theme.darkgray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  font-size: ${(p) => p.theme.font.xl4};
`;

export const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.625;
  margin-top: 24px;
  font-size: ${(p) => p.theme.font.sm};
`;
