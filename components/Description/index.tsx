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
import ThreeDog from '../Dog';

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
        <ThreeDog />
      </ThreeDContainer>
    </DescriptionWrapper>
  );
};

export default React.memo(Description);
