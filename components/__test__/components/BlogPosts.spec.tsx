import React from 'react';
import { Post } from '../../../lib/types';
import BlogPosts from '../../BlogPosts';
import { renderWithThemeProvider } from '../wrappers/withProvider';
import { createRandomPost } from './BlogPostCard.spec';

describe('Blog Posts', () => {
  let posts: Post[] = [];

  afterEach(() => {
    posts = [];
  });
  it('it calls BlogPostCard component for each post data in an array', () => {
    Array(5)
      .fill('')
      .map(() => posts.push(createRandomPost()));

    const { getAllByLabelText } = renderWithThemeProvider(
      <BlogPosts posts={posts} />
    );

    const blogPostCards = getAllByLabelText('blog-post-card');
    expect(blogPostCards.length).toBe(posts.length);
  });

  it('shows empty alert text if no blog posts', () => {
    const { getByText } = renderWithThemeProvider(<BlogPosts posts={posts} />);

    const alertText = getByText(/검색 결과가 없습니다./i);
    expect(alertText).toBeInTheDocument();
  });
});
