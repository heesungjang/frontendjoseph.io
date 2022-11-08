import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import { fetchPosts } from '../../lib/notions';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const { posts } = await fetchPosts(databaseId!);
  const siteUrl = 'https://frontendjoseph.io';

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `${siteUrl}/${post.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(context, fields);
};

export default function Site() {
  return <></>;
}
