// Next & React
import Head from 'next/head';
import { Fragment } from 'react';
import type { NextPage } from 'next';
// lib & components & styles
import { NotionColorsTypes } from '../styles/theme';
import { fetchPosts, fetchFrontMatter } from '../lib/notions';
// Hooks
import { usePageLoadingState } from '../hooks/usePageLoadingState';
// Styles
import { motion } from 'framer-motion';
import styled from 'styled-components';
import FrontPage from '../components/Layout/FrontPage';

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
  const loading = usePageLoadingState();

  return (
    <Fragment>
      <MainWrapper exit={{ opacity: 0 }}>
        <Head>
          <title>{frontmatter.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FrontPage
          tags={tags}
          posts={posts}
          loading={loading}
          frontmatter={frontmatter}
        />
      </MainWrapper>
    </Fragment>
  );
};

const MainWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(p) => p.theme.bg};
`;

export default Main;

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
      revalidate: 3600,
    };
  }
};
