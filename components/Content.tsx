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
            <Title>{frontmatter.title}</Title>
            <div
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.625,
                marginTop: '24px',
              }}
            >
              {frontmatter.description}
            </div>
            <SearchContainer>
              <SearchInput placeholder="Search posts..." />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  marginTop: 2,
                  paddingLeft: 8,
                  opacity: 0.5,
                }}
              >
                <Image
                  src="/assets/search_icon.png"
                  alt="search-box"
                  width={15}
                  height={15}
                />
              </div>
            </SearchContainer>
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

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  
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

const PostWrapper = styled.div`
  margin-top: 36px;
`;

const EmptySpaceHolder = styled.div`
  flex: 1 1 auto;
`;

const Divider = styled.hr<{ mt: number }>`
  width: 100%;
  opacity: 0.2;
  margin-top: ${(p) => p.mt}px;
`;

const PostCard = styled.div`
  width: 100%;
  /* height: 300px; */
`;

const Description = styled.div`
  div {
    color: ${(p) => p.theme.grey};
  }
`;
const Title = styled.h1`
  text-transform: capitalize;
  color: ${(p) => p.theme.darkGrey};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  font-size: ${(p) => p.theme.font.xl5};
`;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.darkGrey};
  background-color: #f7f6f7;
  border: none;
  height: 36px;
  border-radius: 6px;
  opacity: 0.8;
  :focus {
    outline: none;
    border: 1px solid ${(p) => p.theme.grey};
    ::placeholder {
      color: ${(p) => p.theme.darkGrey};
    }
  }
  padding-left: 32px;
  padding-right: 3px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 75ms;
`;
export default Content;
