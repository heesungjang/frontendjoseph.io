// React & Next
import React from 'react';
import dynamic from 'next/dynamic';
import SocialLinks from '../SocialLinks';
import { Frontmatter } from '../../lib/types';
import {
  DescriptionText,
  DescriptionWrapper,
  ThreeDContainer,
  Title,
} from './styles';

const Dog = dynamic(() => import('../Dog'), {
  ssr: false,
  loading: () => null,
});

const Description = ({ frontmatter }: { frontmatter: Frontmatter }) => {
  return (
    <DescriptionWrapper>
      <div
        style={{
          marginTop: '60px',
        }}
      >
        <Title>{frontmatter.title}</Title>
        <DescriptionText>{frontmatter.description}</DescriptionText>
        <SocialLinks />
      </div>

      <ThreeDContainer>
        <Dog />
      </ThreeDContainer>
    </DescriptionWrapper>
  );
};

export default React.memo(Description);
