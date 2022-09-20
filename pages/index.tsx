import type { NextPage } from 'next';
import styled from 'styled-components';
import { media } from '../styles/media';
import { fetchDatabase, fetchFrontMatter } from '../lib/notions';

export const databaseId = process.env.NOTION_DATABASE_ID;

const Home: NextPage = ({ posts, front }: any) => {
  console.log(front);
  // console.log(posts);
  return <TestWrapper></TestWrapper>;
};

const TestWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  ${media.greaterThan('sm')`
    background-color:blue
  `}
`;

export default Home;

export const getStaticProps = async () => {
  if (databaseId) {
    const database = await fetchDatabase(databaseId);
    const frontInfo = await fetchFrontMatter(databaseId);
    console.log(frontInfo);
    return {
      props: {
        posts: database,
      },
      revalidate: 1,
    };
  }
};
