import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Frontmatter, Post } from '../pages';
import { media } from '../styles/media';
import { NotionColorsTypes } from '../styles/theme';
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
              console.log(post.tags);
              if (!post.isHidden) {
                return (
                  <PostCard key={post.id}>
                    <BlogImageWrapper>
                      <BlogImage
                        loader={({ src }) => src}
                        src={post.cover}
                        alt="cover-image"
                        layout="fill"
                        unoptimized={true}
                        priority={true}
                      />
                    </BlogImageWrapper>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        justifyContent: 'center',
                      }}
                    >
                      <BlogTitle>{post.title}</BlogTitle>

                      <BlogDescription>{post.description}</BlogDescription>
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          width: '80%',
                          flexWrap: 'wrap',
                        }}
                      >
                        {post.tags.map((tag) => (
                          <Tag key={tag.id} tagColor={tag.color}>
                            {tag.name}
                          </Tag>
                        ))}
                      </div>
                    </div>
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

const PostCard = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 2rem;
  padding: 24px;
  width: 100%;
  border-radius: 8px;
  :hover {
    background-color: #f5f4f5;
    div:first-child {
      transform: scale(1.05);
    }
  }
  transition: all 0.2s linear;
`;

const Description = styled.div`
  div {
    color: ${(p) => p.theme.gray};
  }
`;
const Title = styled.h1`
  text-transform: capitalize;
  color: ${(p) => p.theme.darkgray};
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
  color: ${(p) => p.theme.darkgray};
  background-color: #f7f6f7;
  border: none;
  height: 36px;
  border-radius: 6px;
  opacity: 0.8;
  :focus {
    outline: none;
    box-shadow: 0 0 4px #c5c4c4;
    ::placeholder {
      color: ${(p) => p.theme.darkgray};
    }
  }
  transition: all 0.2s;
  padding-left: 32px;
  padding-right: 3px;
`;

const BlogTitle = styled.h2`
  font-size: ${(p) => p.theme.font.xl2};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  :hover {
    box-shadow: 0 2px ${(p) => p.theme.gray};
  }
  width: fit-content;

  transition: all 0.1s ease-in;
`;

const BlogDescription = styled.span`
  font-size: ${(p) => p.theme.font.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.gray};
  line-height: 1.5;
`;

const BlogImageWrapper = styled.div`
  width: 465px;
  height: 150px;
  position: relative;
  transition: all 0.2s;
`;

const BlogImage = styled(Image)`
  border-radius: 7px;
`;

const Tag = styled.span<{ tagColor: NotionColorsTypes }>`
  padding: 3px 5px;
  text-align: center;
  border-radius: 3px;
  font-size: ${(p) => p.theme.font.xs};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.black};
  background-color: ${(p) => p.theme.notionColors[p.tagColor]};
  opacity: 0.9;
`;
export default Content;
