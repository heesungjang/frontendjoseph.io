import type { NextPage } from 'next';
import styled from 'styled-components';
import { media } from '../styles/media';
import { fetchPosts, fetchFrontMatter } from '../lib/notions';
import Header from '../components/Header';
import Content from '../components/Content';
import { NotionColorsTypes } from '../styles/theme';

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
  frontmatter: Frontmatter;
};

const Main: NextPage<MainProps> = ({ posts, frontmatter }) => {
  return (
    <MainWrapper>
      <Header />
      <Content posts={posts} frontmatter={frontmatter} />
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
