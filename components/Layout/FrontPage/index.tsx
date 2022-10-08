// React & Next
import React, { useState } from 'react';
//Types
import { Frontmatter, Post, Tag } from '../../../pages';
//Components
import Posts from '../Posts';
import { SearchBox } from '../../SearchBox';
import Description from '../../Description';

//Styles
import {
  ContentWrapper,
  Divider,
  EmptySpaceHolder,
  MainContents,
  MainContentsContainer,
} from './styles';

type ContentProps = {
  posts: Post[];
  frontmatter: Frontmatter;
  loading: boolean;
};

const FrontPage: React.FC<ContentProps> = ({ posts, frontmatter, loading }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <ContentWrapper loading={loading.toString()}>
      <MainContentsContainer>
        <MainContents>
          <Description frontmatter={frontmatter} />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Divider mt={20} mb="30px" />
          <Posts posts={filteredBlogPosts} />
        </MainContents>
      </MainContentsContainer>
      <EmptySpaceHolder />
      <Divider mt={80} />
    </ContentWrapper>
  );
};

export default FrontPage;
