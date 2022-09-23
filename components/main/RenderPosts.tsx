// React & Next
import React from 'react';
import Image from 'next/image';

// pages & components & styles
import { Post } from '../../pages';
import { NotionColorsTypes } from '../../styles/theme';

// packages
import styled from 'styled-components';
import { media } from '../../styles/media';

type PostProps = {
  posts: Post[];
};

const RenderPosts: React.FC<PostProps> = ({ posts }) => {
  const renderedPosts = posts.map((post) => {
    const tags = post.tags.map((tag) => (
      <Tag key={tag.id} tagColor={tag.color}>
        {tag.name}
      </Tag>
    ));

    if (!post.isHidden) {
      return (
        <PostWrapper key={post.id}>
          <BlogImageContainer>
            <BlogImage
              loader={({ src }) => src}
              src={post.cover}
              alt="cover-image"
              layout="fill"
              unoptimized={true}
              priority={true}
            />
          </BlogImageContainer>
          <PostInfoContainer>
            <BlogTitle>{post.title}</BlogTitle>
            <BlogDescription>{post.description}</BlogDescription>
            <TagContainer>{[...tags]}</TagContainer>
          </PostInfoContainer>
        </PostWrapper>
      );
    }
  });

  return <>{[...renderedPosts]}</>;
};

const PostWrapper = styled.a`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 2rem;
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  :hover {
    background-color: #f5f4f5;
    div:first-child {
      transform: scale(1.05);
    }
  }
  transition: all 0.2s linear;

  ${media.lessThan('md')`
    flex-direction:column;
    align-items: center;
    gap: 1rem;
  `};
`;

const PostInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;

  ${media.lessThan('md')`
    flex-direction:column;
    align-items: center;
    gap: 1rem;
  `};
`;

const BlogTitle = styled.h2`
  font-size: ${(p) => p.theme.font.xl2};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  :hover {
    box-shadow: 0 2px ${(p) => p.theme.gray};
  }
  width: fit-content;

  transition: all 0.1s ease-in;
`;

const BlogDescription = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.gray};
  line-height: 1.5;
`;

const BlogImageContainer = styled.div`
  width: 465px;
  height: 150px;
  position: relative;
  transition: all 0.2s;

  ${media.lessThan('md')`
    width:100%;
    min-height: 220px;
  `};
`;

const BlogImage = styled(Image)`
  object-fit: cover;
  border-radius: 7px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 80%;
  flex-wrap: wrap;
  ${media.lessThan('md')`
    width:100%;
    flex-direction:row;
    justify-content: center;
    flex-wrap: nowrap;
  `};
`;

const Tag = styled.span<{ tagColor: NotionColorsTypes }>`
  padding: 3px 5px;
  text-align: center;
  border-radius: 3px;
  font-size: ${(p) => p.theme.font.xs};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.black};
  background-color: ${(p) => p.theme.notionColors[p.tagColor]};
  opacity: 0.9;
`;

export default RenderPosts;
