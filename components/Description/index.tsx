// React & Next
import React from 'react';

// pages & components
import { Frontmatter } from '../../pages';

// packages

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { slug } from '../../slug';
import GithubIcon from '../../public/assets/github.svg';
import EmailIcon from '../../public/assets/email.svg';
import Linkedin from '../../public/assets/linkedin.svg';
import {
  DescriptionText,
  DescriptionWrapper,
  SlugContainer,
  ThreeDContainer,
  Title,
} from './styles';

type DescriptionProps = {
  frontmatter: Frontmatter;
};

const Dog = dynamic(() => import('../Dog'), {
  ssr: false,
  loading: () => null,
});

const Description: React.FC<DescriptionProps> = ({ frontmatter }) => {
  return (
    <DescriptionWrapper>
      <div>
        <Title>{frontmatter.title}</Title>
        <DescriptionText>{frontmatter.description}</DescriptionText>

        <SlugContainer>
          {slug.gitHub && (
            <Link href={slug.gitHub}>
              <a target="_blank" rel="noopener noreferrer">
                <GithubIcon
                  width={20}
                  height={20}
                  aria-label="github_link_icon"
                />
              </a>
            </Link>
          )}

          {/* {slug.linkedIn && (
            <Link href={slug.linkedIn}>
              <a rel="noopener noreferrer" style={{ opacity: 0.85 }}>
                <Linkedin
                  width={20}
                  height={20}
                  aria-label="linkedin_link_icon"
                />
              </a>
            </Link>
          )} */}

          {slug.email && (
            <Link href={`mailto:${slug.email}`}>
              <a rel="noopener noreferrer">
                <EmailIcon
                  width={20}
                  height={20}
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
