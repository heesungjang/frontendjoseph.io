// Next
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

// lib & components & styles

import Content from '../components/main/Content';
import { NotionColorsTypes } from '../styles/theme';
import { fetchPosts, fetchFrontMatter } from '../lib/notions';

// packages
import styled from 'styled-components';

import { motion } from 'framer-motion';
import Head from 'next/head';
import Router from 'next/router';
import ThreeDotsWave from '../components/shared/Loader';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      // NProgress.start();
      setLoading(true);
    };
    const end = () => {
      // NProgress.done();
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  console.log(loading);

  return (
    <MainWrapper exit={{ opacity: 0 }}>
      {loading ? <ThreeDotsWave /> : null}
      <Head>
        <title>{frontmatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content
        posts={posts}
        frontmatter={frontmatter}
        tags={tags}
        loading={loading}
      />
    </MainWrapper>
  );
};

const MainWrapper = styled(motion.div)`
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
