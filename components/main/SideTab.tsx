import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../pages';
import { media } from '../../styles/media';
import Tags from './Tags';

type TagsProps = {
  tags: Tag[];
};

const SideTab: React.FC<TagsProps> = ({ tags }) => {
  return (
    <SideTabWrapper>
      <SideTapHeader>Tags</SideTapHeader>
      <Tags tags={[{ color: 'gray', name: 'All', id: 'all' }]} />
      <Tags tags={tags} />
    </SideTabWrapper>
  );
};

const SideTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 1rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  top: 10px;
  right: -120px;
  ${media.lessThan('lg')`
    display:none
  `}
`;

const SideTapHeader = styled.span`
  font-size: ${(p) => p.theme.font.xs};
  color: ${(p) => p.theme.gray};
`;

export default SideTab;
