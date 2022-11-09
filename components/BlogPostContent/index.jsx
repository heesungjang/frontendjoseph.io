import { Fragment } from 'react';
import { Block, Text } from '../Block';
import { ArticleWrapper, Created, GoBack, H1Title } from './styles';

export const BlogPostContent = ({ page, blocks }) => {
  return (
    <ArticleWrapper>
      <GoBack href="/">← Go Back</GoBack>
      <H1Title>
        <Text text={page.properties.Name.title} />
      </H1Title>
      <Created>
        {page.properties?.Authors?.people[0]?.name
          ? ' ' + page.properties?.Authors?.people[0]?.name
          : ' unknown'}
      </Created>
      <Created>{page.properties.Date.date?.start.slice(0, 10)}</Created>

      {/* <Divider mt={20} /> */}
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{Block(block)}</Fragment>
        ))}
      </section>
    </ArticleWrapper>
  );
};
