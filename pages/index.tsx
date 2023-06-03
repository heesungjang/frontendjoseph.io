// Next & React
import Head from 'next/head';
import { useState } from 'react';
import type { InferGetStaticPropsType } from 'next';
// lib
import { fetchPosts, fetchFrontMatter } from '../lib/notions';
// Components
import BlogPosts from '../components/BlogPosts';
import Description from '../components/Description';
import SearchBox from '../components/SearchBox';
import FrontPageLayout from '../components/Layout/FrontPageLayout';

// Styles
import { motion } from 'framer-motion';
import styled from 'styled-components';
// Types
import { Frontmatter, Post } from '../lib/types';

const Main = ({
  posts,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Layout exit={{ opacity: 0 }}>
      <Head>
        <title>{frontmatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FrontPageLayout>
        <Description frontmatter={frontmatter} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <BlogPosts posts={filteredBlogPosts} />
      </FrontPageLayout>
    </Layout>
  );
};

export default Main;

export const getStaticProps = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const results = await Promise.all([
    fetchPosts(databaseId!),
    fetchFrontMatter(databaseId!),
  ]);
  const [{ posts }, frontmatter] = results;

  return {
    props: {
      posts,
      frontmatter: {
        title: frontmatter?.title[0].plain_text,
        description: frontmatter?.description[0].plain_text,
      },
    } as { posts: Post[]; frontmatter: Frontmatter },
    revalidate: 10,
  };
};

const Layout = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(p) => p.theme.bg};
`;
