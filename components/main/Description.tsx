// React & Next
import React from 'react';
import Image from 'next/image';

// pages & components
import { Frontmatter } from '../../pages';

// packages
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { slug } from '../../slug';
import GithubIcon from '../../public/assets/github.svg';
import EmailIcon from '../../public/assets/email.svg';
import Linkedin from '../../public/assets/linkedin.svg';

type DescriptionProps = {
  frontmatter: Frontmatter;
};

const Dog = dynamic(() => import('../main/Dog'), {
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
                <GithubIcon width={20} height={20} />
              </a>
            </Link>
          )}

          {slug.linkedIn && (
            <Link href={slug.linkedIn}>
              <a rel="noopener noreferrer" style={{ opacity: 0.856 }}>
                <Linkedin width={20} height={20} />
              </a>
            </Link>
          )}

          {slug.email && (
            <Link href={`mailto:${slug.email}`}>
              <a rel="noopener noreferrer">
                <EmailIcon width={20} height={20} />
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

const ThreeDContainer = styled.div`
  width: 250px;
  height: 230px;
  position: relative;
  display: flex;

  justify-content: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: flex-end;
  justify-content: space-between;
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

const DescriptionText = styled.div`
  white-space: pre-wrap;
  line-height: 1.625;
  margin-top: 24px;
`;

const SlugContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  gap: 15px;
  opacity: 0.8;
`;

export default Description;
