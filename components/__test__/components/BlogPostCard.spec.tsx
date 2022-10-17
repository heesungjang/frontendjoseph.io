import React from 'react';
import { faker } from '@faker-js/faker';
import { build, perBuild } from '@jackfranklin/test-data-bot';

import { renderWithThemeProvider } from '../wrappers/withProvider';
import { Post, Tag } from '../../../lib/types';
import BlogPostCard from '../../BlogPostCard';

const buildTag = build<Tag>({
  fields: {
    id: perBuild(() => faker.datatype.uuid()),
    name: perBuild(() => faker.word.adjective()),
    color: 'red',
  },
});

export function createRandomPost(override = {}): Post {
  return {
    id: faker.datatype.uuid(),
    title: faker.internet.userName(),
    description: faker.lorem.paragraph(),
    isHidden: false,
    date: faker.date.past().toString(),
    tags: [buildTag(), buildTag()],
    ...override,
  };
}

describe('Blog Post Card', () => {
  it('should renders a blog post card for given post data', () => {
    const POST = createRandomPost();

    const { getAllByTestId, getByLabelText } = renderWithThemeProvider(
      <BlogPostCard post={POST} />
    );

    const blogPostCard = getByLabelText('blog-post-card');
    const blogTitle = getByLabelText('blog-title');
    const blogDescription = getByLabelText('blog-description');
    const blogTags = getAllByTestId('blog-tag');

    expect(blogPostCard).toBeInTheDocument();
    expect(blogTitle).toHaveTextContent(POST.title);
    expect(blogDescription).toHaveTextContent(POST.description);
    expect(blogTags.length).toBe(POST.tags.length);
    expect(blogTags[0]).toHaveTextContent(POST.tags[0].name);
  });

  it('should not render a blog post card if isHidden property is true', () => {
    const POST = createRandomPost({ isHidden: true });

    const { queryByLabelText } = renderWithThemeProvider(
      <BlogPostCard post={POST} />
    );
    const blogPostCard = queryByLabelText('blog-post-card');
    expect(blogPostCard).not.toBeInTheDocument();
  });

  it('should not render any text for tags if no tags are empty', () => {
    const POST = createRandomPost({ tags: [] });
    const { queryAllByTestId } = renderWithThemeProvider(
      <BlogPostCard post={POST} />
    );
    const blogTags = queryAllByTestId('blog-tag');

    expect(blogTags.length).toBe(0);
  });
});
