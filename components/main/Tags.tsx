import React from 'react';
import styled from 'styled-components';
import { Tag as TagType } from '../../pages';
import { Tag } from './RenderPosts';

type TagsProps = {
  tags: TagType[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Tag key={tag.id} tagColor={tag.color} size="xs">
          {tag.name}
        </Tag>
      ))}
    </TagsWrapper>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* flex-wrap: wrap; */
  /* gap: 0.5rem; */
  /* width: 100%; */
`;
export default Tags;
