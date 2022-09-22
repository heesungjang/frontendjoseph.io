import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Frontmatter, Post } from '../pages';
import { media } from '../styles/media';
import Footer from './Footer';

type ContentProps = {
  posts: Post[];
  frontmatter: Frontmatter;
};

const Content: React.FC<ContentProps> = ({ posts, frontmatter }) => {
  return (
    <ContentWrapper>
      <MainContentsWrapper>
        <MainContents>
          <Description>
            <h1>{frontmatter.title}</h1>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {frontmatter.description}
            </div>
            <div style={{ marginTop: '24px' }}>
              <input placeholder="Search posts..." />
            </div>
          </Description>
          <Divider mt={36} />
          <PostWrapper>
            {posts.map((post) => {
              if (!post.isHidden) {
                return (
                  <PostCard key={post.id}>
                    <Image
                      loader={({ src }) => src}
                      src={post.cover}
                      alt="cover-image"
                      width={250}
                      height={250}
                      layout="fixed"
                    />
                    <h2>{post.title}</h2>
                    <div>
                      {post.tags.map((tag, idx) => (
                        <div key={tag.id}>{tag.name}</div>
                      ))}
                    </div>
                    <div>{post.description}</div>
                  </PostCard>
                );
              }
            })}
          </PostWrapper>
        </MainContents>
      </MainContentsWrapper>
      <EmptySpaceHolder></EmptySpaceHolder>
      <Divider mt={80} />
      <Footer />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: calc(100% - 40px);
  background-color: pink;

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  background-color: blue;
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  background-color: red;
  `};
`;

const MainContentsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const MainContents = styled.div`
  width: 100%;
`;

const Description = styled.div``;

const PostWrapper = styled.div`
  margin-top: 36px;
`;

const EmptySpaceHolder = styled.div`
  flex: 1 1 auto;
`;

const Divider = styled.hr<{ mt: number }>`
  width: 100%;
  margin-top: ${(p) => p.mt}px;
`;

const PostCard = styled.div`
  width: 100%;
  /* height: 300px; */
  background-color: red;
`;
export default Content;
