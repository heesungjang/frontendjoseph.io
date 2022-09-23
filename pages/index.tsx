// Next
import type { NextPage } from 'next';

// lib & components & styles
import Header from '../components/shared/Header';
import Content from '../components/main/Content';
import { NotionColorsTypes } from '../styles/theme';
import { fetchPosts, fetchFrontMatter } from '../lib/notions';

// packages
import styled from 'styled-components';

export const databaseId = process.env.NOTION_DATABASE_ID;

export interface Tag {
  id: string;
  name: string;
  color: NotionColorsTypes;
}
export interface Post {
  id: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  isHidden: boolean;
  createdAt: string;
}

export interface Frontmatter {
  title: string;
  description: string;
}

type MainProps = {
  posts: Post[];
  tags: Tag[];
  frontmatter: Frontmatter;
};

const Main: NextPage<MainProps> = ({ posts, frontmatter, tags }) => {
  return (
    <MainWrapper>
      <Header />
      <Content posts={posts} frontmatter={frontmatter} tags={tags} />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;

// SSG
export const getStaticProps = async () => {
  if (databaseId) {
    const { tags, posts } = await fetchPosts(databaseId);
    const frontmatter = await fetchFrontMatter(databaseId);

    return {
      props: {
        posts,
        tags,
        frontmatter: {
          title: frontmatter?.title[0].plain_text,
          description: frontmatter?.description[0].plain_text,
        },
      },
      revalidate: 1,
    };
  }
};
