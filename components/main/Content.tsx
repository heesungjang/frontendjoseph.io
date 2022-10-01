// React & Next
import React, { useState } from 'react';

// components & pages & styles
import { media } from '../../styles/media';
import Description from './Description';
import RenderPosts from './RenderPosts';
import { Frontmatter, Post, Tag } from '../../pages';

// packages
import styled from 'styled-components';
import SideTab from './SideTab';
import Image from 'next/image';
import { getIOSInputEventHandlers } from '../../lib/utils';

type ContentProps = {
  posts: Post[];
  tags: Tag[];
  frontmatter: Frontmatter;
  loading: boolean;
};

const Content: React.FC<ContentProps> = ({
  posts,
  frontmatter,
  // tags props will be used for tag filtering posts
  // tags,
  loading,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <ContentWrapper loading={loading.toString()}>
      <MainContentsContainer>
        <MainContents>
          {/* top section (description)*/}
          <Description frontmatter={frontmatter} />

          <SearchContainer>
            <SearchInput
              placeholder="Search Posts..."
              value={searchValue}
              {...getIOSInputEventHandlers()}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconWrapper>
              <Image
                src="/assets/search_icon.png"
                alt="search-box"
                width={15}
                height={15}
              />
            </IconWrapper>
          </SearchContainer>

          <Divider mt={20} mb="30px" />
          {/* posts section (posts)*/}
          {!filteredBlogPosts.length && (
            <NoSearchPostContainer>
              <NoSearchPostText>검색 결과가 없습니다.</NoSearchPostText>
            </NoSearchPostContainer>
          )}
          <RenderPosts posts={filteredBlogPosts} />
          <SideTapContainer>{/* <SideTab tags={tags} /> */}</SideTapContainer>
        </MainContents>
      </MainContentsContainer>

      {/*space holder */}
      <EmptySpaceHolder></EmptySpaceHolder>
      <Divider mt={80} />
    </ContentWrapper>
  );
};

const NoSearchPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const NoSearchPostText = styled.span`
  font-size: ${(p) => p.theme.font.xl};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  color: ${(p) => p.theme.gray};
`;

const ContentWrapper = styled.div<{ loading: string }>`
  opacity: ${(p) => (p.loading === 'true' ? 0.6 : undefined)};
  position: 'relative';
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: calc(100% - 40px);
  transition: all 0.1s linear;

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  
  `};
`;

const MainContentsContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const MainContents = styled.div`
  width: 100%;
`;

export const EmptySpaceHolder = styled.div`
  flex: 1 1 auto;
`;

export const Divider = styled.hr<{ mt: number; w?: string; mb?: string }>`
  width: ${(p) => (p.w ? p.w : '100%')};
  opacity: 0.2;
  margin-top: ${(p) => p.mt}px;
  margin-bottom: ${(p) => (p.mb ? p.mb : null)};
`;

const SideTapContainer = styled.div`
  position: relative;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.darkgray};
  background-color: #f7f6f7;
  border: none;
  height: 36px;
  border-radius: 6px;
  opacity: 0.8;
  :focus {
    ::placeholder {
      color: ${(p) => p.theme.darkgray};
    }
  }
  transition: all 0.2s;
  padding-left: 32px;
  padding-right: 3px;
`;

const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.625;
  margin-top: 24px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  margin-top: 2;
  padding-left: 8px;
  opacity: 0.5;
`;
export default Content;
