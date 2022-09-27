import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { databaseId } from '..';
import { fetchPosts } from '../../lib/notions';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { posts } = await fetchPosts(databaseId!);
  const siteUrl = 'https://heelog.dev';

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `${siteUrl}/${post.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(context, fields);
};

export default function Site() {
  return <></>;
}
