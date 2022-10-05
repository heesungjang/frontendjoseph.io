// React & Next
import React from 'react';

// pages & components
import { Frontmatter } from '../../pages';
import { FaGithub } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';

// packages

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { slug } from '../../slug';

import {
  DescriptionText,
  DescriptionWrapper,
  SlugContainer,
  ThreeDContainer,
  Title,
} from './styles';
import { useThemeMode } from '../../hooks/useTheme';

type DescriptionProps = {
  frontmatter: Frontmatter;
};

const Dog = dynamic(() => import('../Dog'), {
  ssr: false,
  loading: () => null,
});

const Description: React.FC<DescriptionProps> = ({ frontmatter }) => {
  const {
    state: { isDark },
  } = useThemeMode();
  return (
    <DescriptionWrapper>
      <div>
        <Title>{frontmatter.title}</Title>
        <DescriptionText>{frontmatter.description}</DescriptionText>

        <SlugContainer>
          {slug.gitHub && (
            <Link href={slug.gitHub}>
              <a target="_blank" rel="noopener noreferrer">
                <FaGithub
                  fill={isDark ? 'white' : 'black'}
                  size={20}
                  aria-label="github_link_icon"
                />
              </a>
            </Link>
          )}

          {slug.email && (
            <Link href={`mailto:${slug.email}`}>
              <a rel="noopener noreferrer">
                <GrMail
                  fill={isDark ? 'white' : 'black'}
                  size={20}
                  aria-label="email_link_icon"
                />
              </a>
            </Link>
          )}
        </SlugContainer>
      </div>
      {/* three js  image */}
      <ThreeDContainer>
        <Dog />
      </ThreeDContainer>
    </DescriptionWrapper>
  );
};

export default Description;
