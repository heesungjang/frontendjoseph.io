// React & Next
import React from 'react';
import Image from 'next/image';

// pages & components & styles
import { Post } from '../../pages';
import { NotionColorsTypes, TagSize } from '../../styles/theme';

// packages
import styled from 'styled-components';
import { media } from '../../styles/media';
import Link from 'next/link';

type PostProps = {
  posts: Post[];
};

const RenderPosts: React.FC<PostProps> = ({ posts }) => {
  const renderedPosts = posts.map((post) => {
    const tags = post.tags.map((tag) => (
      <Tag key={tag.id} tagColor={tag.color} size="xs">
        {tag.name}
      </Tag>
    ));

    if (!post.isHidden) {
      return (
        <Link href={`/${post.id}`} key={post.id}>
          <PostWrapper>
            {/* <BlogImageContainer>
              <BlogImage
                loader={({ src }) => src}
                src={post.cover}
                alt="cover-image"
                layout="fill"
                unoptimized={true}
                priority={true}
              />
            </BlogImageContainer> */}
            <PostInfoContainer>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogDescription>{post.description}</BlogDescription>
              <TagContainer>{[...tags]}</TagContainer>
            </PostInfoContainer>
          </PostWrapper>
        </Link>
      );
    }
  });

  return <>{[...renderedPosts]}</>;
};

const PostWrapper = styled.a`
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
  width: 100%;
  border-radius: 8px;
  padding: 24px;
  :hover {
    background-color: #f5f4f5;
  }
  transition: all 0.2s linear;

  /* ${media.lessThan('md')`
    flex-direction:column;
    align-items: center;
    gap: 1rem;
  `}; */
`;

const PostInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  /* 
  ${media.lessThan('md')`
    flex-direction:column;
    align-items: f;
    gap: 1rem;
  `}; */
`;

const BlogTitle = styled.h2`
  line-height: 1.2;
  font-size: ${(p) => p.theme.font.xl2};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  :hover {
    text-decoration-line: underline;
    text-decoration-color: ${(p) => p.theme.gray};
  }
  width: fit-content;
`;

const BlogDescription = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.gray};
  line-height: 1.5;
`;

const BlogImageContainer = styled.div`
  width: 555px;
  height: 160px;
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
  width: 100%;
  flex-wrap: wrap;
  /* ${media.lessThan('md')`
    width:100%;
    flex-direction:row;
    justify-content: center;
    flex-wrap: nowrap;
  `}; */
`;

export const Tag = styled.span<{ tagColor: NotionColorsTypes; size: TagSize }>`
  width: fit-content;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: ${(p) => p.theme.font[p.size]};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.black};
  background-color: ${(p) => p.theme.notionColors[p.tagColor]};
  opacity: 0.9;
  cursor: pointer;
`;

export default RenderPosts;
