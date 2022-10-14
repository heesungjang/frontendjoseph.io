import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import styled from 'styled-components';
import { useThemeMode } from '../../hooks/useTheme';
import { socialLinks } from '../../slug';

const SocialLinks = () => {
  return (
    <SocialLinkContainer>
      {Object.entries(socialLinks).map((social, idx) => {
        const [socialType, link] = social;
        return (
          <Link
            href={socialType === 'email' ? `mailto:${link}` : link}
            key={idx}
          >
            <a rel="noopener noreferrer">
              <SocialIcon name={socialType} />
            </a>
          </Link>
        );
      })}
    </SocialLinkContainer>
  );
};

const SocialIcon = ({ name }: { name: string }) => {
  const {
    state: { isDark },
  } = useThemeMode();
  switch (name) {
    case 'gitHub': {
      return (
        <FaGithub
          size={20}
          fill={isDark ? 'white' : 'black'}
          aria-label={name}
        />
      );
    }
    case 'email': {
      return (
        <GrMail size={20} fill={isDark ? 'white' : 'black'} aria-label={name} />
      );
    }
    case 'linkedIn': {
      return (
        <FaLinkedin
          size={20}
          fill={isDark ? 'white' : 'black'}
          aria-label={name}
        />
      );
    }
    default: {
      return null;
    }
  }
};

const SocialLinkContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  gap: 15px;
  opacity: 0.8;
`;

export default SocialLinks;
