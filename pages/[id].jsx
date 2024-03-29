// React & Next
import Head from 'next/head';
import dynamic from 'next/dynamic';
// Lib
import {
  fetchPage,
  fetchBlocks,
  fetchDatabase,
  fetchFrontMatter,
} from '../lib/notions';
import { isFullBlock } from '@notionhq/client';
// Components
import styled from 'styled-components';
import { BlogPostContent } from '../components/BlogPostContent';

const Utterances = dynamic(() => import('../components/shared/Utterances'));
const databaseId = process.env.NOTION_DATABASE_ID;
export default function DetailPage({ page, blocks, frontmatter }) {
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <PostLayout>
      <Head>
        <title>{`${page.properties.Name.title[0].plain_text} | heesungjang.dev`}</title>
        <meta
          property="og:title"
          content={`FEJoseph | ${page.properties.Name.title[0].plain_text}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlogPostContent page={page} blocks={blocks} />
      <Utterances />
    </PostLayout>
  );
}

export const getStaticPaths = async () => {
  const database = await fetchDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await fetchPage(id);
  const blocks = await fetchBlocks(id);
  const frontmatter = await fetchFrontMatter(databaseId);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => {
        if (isFullBlock(block)) {
          return block.has_children;
        }
      })
      .map(async (block) => {
        return {
          id: block.id,
          children: await fetchBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    if (
      isFullBlock(block) &&
      block.has_children &&
      !block[block.type].children
    ) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      frontmatter: frontmatter,
    },
    revalidate: 10,
  };
};

const PostLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;
