// React & Next
import React from 'react';
import {
  NoSearchPostContainer,
  NoSearchPostText,
} from '../Layout/FrontPageLayout/styles';
import { Post } from '../../lib/types';
import BlogPostCard from '../BlogPostCard';

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  if (!posts.length) {
    return (
      <NoSearchPostContainer>
        <NoSearchPostText>검색 결과가 없습니다.</NoSearchPostText>
      </NoSearchPostContainer>
    );
  }

  return (
    <>
      {posts.map((post) => {
        return <BlogPostCard post={post} key={post.id} />;
      })}
    </>
  );
};

export default BlogPosts;
