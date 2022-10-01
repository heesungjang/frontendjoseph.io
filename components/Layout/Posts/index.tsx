// React & Next
import React from 'react';
import Link from 'next/link';
// Components
import { Post } from '../../../pages';
//Styles
import { NoSearchPostContainer, NoSearchPostText } from '../FrontPage/styles';
import {
  BlogDescription,
  BlogTitle,
  PostInfoContainer,
  PostWrapper,
  Tag,
  TagContainer,
} from './styles';

type PostProps = {
  posts: Post[];
};

const Posts: React.FC<PostProps> = ({ posts }) => {
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

export default Posts;
