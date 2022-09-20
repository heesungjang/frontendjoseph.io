import type { NextPage } from 'next';
import styled from 'styled-components';
import { media } from '../styles/media';
import { fetchPosts, fetchFrontMatter } from '../lib/notions';

export const databaseId = process.env.NOTION_DATABASE_ID;

export interface Post {
  cover: string;
  title: string;
  tags: string[];
  description: string;
  isHidden: boolean;
  createdAt: string;
}

type IMainProps = {
  posts: Post[];
  frontmatter: {
    title: string;
    description: string;
  };
};

const Main: NextPage<IMainProps> = ({ posts, frontmatter }) => {
  return null;
};

const TestWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  ${media.greaterThan('sm')`
    background-color:blue
  `}
`;

export default Main;

export const getStaticProps = async () => {
  if (databaseId) {
    const posts = await fetchPosts(databaseId);
    const frontmatter = await fetchFrontMatter(databaseId);

    return {
      props: {
        posts,
        frontmatter: {
          title: frontmatter?.title[0].plain_text,
          description: frontmatter?.description[0].plain_text,
        },
      },
      revalidate: 1,
    };
  }
};
