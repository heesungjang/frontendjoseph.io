// React & Next
import React from 'react';

// components & pages & styles
import { media } from '../../styles/media';
import Footer from '../shared/Footer';
import Description from './Description';
import RenderPosts from './RenderPosts';
import { Frontmatter, Post, Tag } from '../../pages';

// packages
import styled from 'styled-components';
import SideTab from './SideTab';

type ContentProps = {
  posts: Post[];
  tags: Tag[];
  frontmatter: Frontmatter;
};

const Content: React.FC<ContentProps> = ({ posts, frontmatter, tags }) => {
  return (
    <ContentWrapper>
      <MainContentsContainer>
        <MainContents>
          {/* top section (description)*/}
          <Description frontmatter={frontmatter} />

          <Divider mt={45} w="200px" mb="30px" />
          {/* Tags */}
          {/* <Tags tags={tags} /> */}
          {/* posts section (posts)*/}
          <SideTapContainer>
            <SideTab tags={tags} />
            <RenderPosts posts={posts} />
          </SideTapContainer>
        </MainContents>
      </MainContentsContainer>

      {/*space holder */}
      <EmptySpaceHolder></EmptySpaceHolder>
      <Divider mt={80} w="200px" />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  position: 'relative';
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

export default Content;
