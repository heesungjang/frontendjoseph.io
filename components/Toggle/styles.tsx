import styled from 'styled-components';

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 2px;
`;

export const ToggleInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;
export const ToggleButton = styled.span<{ on: number }>`
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 2em;
  height: 0.8em;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: ${(p) => p.theme.bg};
  border-radius: 4em;
  padding: 4px;
  transition: all 0.4s ease;
  border: 2px solid #e8eae9;
  ::after {
    left: ${(p) => (p.on ? '65%' : 0)};
    position: relative;
    display: block;
    content: '';
    width: 35%;
    height: 100%;
    border-radius: 1em;
    background: #e8eae9;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
    box-shadow: ${(p) =>
      p.on
        ? 'none'
        : '0 0 0 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);'};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
  }
  ::active {
    margin-left: -1.6em;
    padding-right: 1.6em;
  }
`;

export const ToggleText = styled.span`
  font-size: ${(p) => p.theme.font.xs};
  color: ${(p) => p.theme.gray};
`;
