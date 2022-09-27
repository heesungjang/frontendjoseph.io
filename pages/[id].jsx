// React & Next
import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// lib & components
import {
  ArticleWrapper,
  Created,
  GoBack,
  H1,
  H1Title,
  PostWrapper,
  ProgressBar,
} from '../components/detail/styles';
import { renderBlock, Text } from '../components/detail/renderer';
import { fetchPage, fetchBlocks, fetchDatabase } from '../lib/notions';
import { Divider, EmptySpaceHolder } from '../components/main/Content';

// packages
import { useScroll } from 'framer-motion';
import { isFullBlock } from '@notionhq/client';

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Post({ page, blocks }) {
  console.log(page);
  const { scrollYProgress } = useScroll();

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <PostWrapper>
      <ProgressBar
        style={{
          scaleX: scrollYProgress,
        }}
      />
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArticleWrapper>
        <Link href="/">
          <GoBack>← Go Back</GoBack>
        </Link>
        <H1Title>
          <Text text={page.properties.Name.title} />
        </H1Title>
        <Created>
          {page.properties?.Authors?.people[0]?.name
            ? ' ' + page.properties?.Authors?.people[0]?.name
            : ' unknown'}
        </Created>
        <Created>{page.properties.Date.date?.start.slice(0, 10)}</Created>

        <Divider mt={20} />
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </ArticleWrapper>
      <EmptySpaceHolder style={{ marginBottom: '50px' }} />
    </PostWrapper>
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
    },
    revalidate: 1,
  };
};
