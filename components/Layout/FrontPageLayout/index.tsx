// React & Next
import React from 'react';
//Styles
import {
  ContentWrapper,
  Divider,
  EmptySpaceHolder,
  MainContents,
  MainContentsContainer,
} from './styles';
import { usePageLoadingState } from '../../../hooks/usePageLoadingState';

type ContentProps = {
  children: React.ReactNode;
};

const FrontPageLayout: React.FC<ContentProps> = ({ children }) => {
  const loading = usePageLoadingState();
  return (
    <ContentWrapper loading={loading.toString()}>
      <MainContentsContainer>
        <MainContents>{children}</MainContents>
      </MainContentsContainer>
      <EmptySpaceHolder />
      <Divider mt={80} />
    </ContentWrapper>
  );
};

export default FrontPageLayout;
