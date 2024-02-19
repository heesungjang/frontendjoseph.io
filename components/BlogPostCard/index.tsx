import Link from 'next/link';
import React from 'react';
import { Post } from '../../lib/types';
import {
  BlogDescription,
  BlogTitle,
  PostInfoContainer,
  PostWrapper,
  Tag,
  TagContainer,
} from './styles';

const BlogPostCard = ({ post }: { post: Post }) => {
  if (post.isHidden) return null;
  return (
    <Link href={`/${post.id}`} key={post.id} prefetch={false}>
      <PostWrapper aria-label="blog-post-card">
        <PostInfoContainer>
          <BlogTitle aria-label="blog-title">{post.title}</BlogTitle>
          <BlogDescription aria-label="blog-description">
            {post.description}
          </BlogDescription>
          {/* <TagContainer>
            {post.tags.map((tag) => (
              <Tag
                data-testid="blog-tag"
                key={tag.id}
                tagColor={tag.color}
                size="xs"
              >
                {tag.name}
              </Tag>
            ))}
          </TagContainer> */}
        </PostInfoContainer>
      </PostWrapper>
    </Link>
  );
};

export default BlogPostCard;
