import styled from 'styled-components';
import FrontPageLayout from '../../components/Layout/FrontPageLayout';
import {
  Divider,
  EmptySpaceHolder,
} from '../../components/Layout/FrontPageLayout/styles';
import SocialLinks from '../../components/SocialLinks';
import { media } from '../../styles/media';

const About = () => {
  return (
    <Wrapper>
      <Layout>
        <Title>About</Title>
        <SocialLinks />
        <Divider mt={20} />

        <Name>Hi, I&apos;m Joseph</Name>
        <SubTitle>
          I&apos;m a frontend engineer currently living in Queensland,
          Australia.
        </SubTitle>
        <Text>admire those who appreciate the aesthetic.</Text>
        <Text>coffee, comics and triple double u enthusiast.</Text>
        <Text>
          appreciate the virtue of spending time on seemingly useless things.
        </Text>
        <Text>create value with technology.</Text>
        <Text>
          believe that programming is the best way to have an impact on
          people&apos;s everyday life.
        </Text>
        <Text>an impact-driven software engineer wannabe.</Text>
      </Layout>
    </Wrapper>
  );
};

export default About;

const Title = styled.h1`
  color: ${(p) => p.theme.darkgray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  font-size: ${(p) => p.theme.font.xl4};
  margin-top: 77px;

  ${media.lessThan('md')`
  margin-top: 20px;
  `};
`;

const Name = styled.h1`
  color: ${(p) => p.theme.darkgray};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  font-size: ${(p) => p.theme.font.xl2};
  margin-top: 16px;
  line-height: 1.5;
`;
const SubTitle = styled(Name)`
  color: ${(p) => p.theme.darkgray};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  font-size: ${(p) => p.theme.font.lg};
  margin-top: 16px;
  line-height: 1.5;
`;

const Text = styled.span`
  margin-top: 16px;
  font-size: ${(p) => p.theme.font.sm};
  color: ${(p) => p.theme.gray};
  line-height: 1.5;
  ::before {
    content: '· ';
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.bg};
  min-height: 100vh;

  ${media.lessThan('md')`
  margin: 0 20px;
  `};

  ${media.greaterThan('md')`
  width: 620px;
  margin: 0 40px;
  `};

  ${media.greaterThan('lg')`
  width: 720px;
  margin: 0 40px;
  `};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
