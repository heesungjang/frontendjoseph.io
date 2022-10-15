// React & Next
import React from 'react';
import Link from 'next/link';

//Styles
import {
  NoSearchPostContainer,
  NoSearchPostText,
} from '../Layout/FrontPageLayout/styles';
import { BlogDescription, BlogTitle } from './styles';
import { PostInfoContainer, PostWrapper, Tag, TagContainer } from './styles';
import { Post } from '../../lib/types';

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  if (!posts.length) {
    return (
      <NoSearchPostContainer>
        <NoSearchPostText>검색 결과가 없습니다.</NoSearchPostText>
      </NoSearchPostContainer>
    );
  }

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

export default BlogPosts;
