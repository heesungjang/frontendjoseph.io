import { Fragment } from 'react';
import Head from 'next/head';
import { fetchPage, fetchBlocks, fetchDatabase } from '../lib/notions';
import Link from 'next/link';

import styles from './post.module.css';
import styled from 'styled-components';
import { EmptySpaceHolder } from '../components/main/Content';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const databaseId = process.env.NOTION_DATABASE_ID;

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    return (
      <TextSpan
        styles={{ bold, code, color, italic, strikethrough, underline }}
      >
        {text.link ? (
          <LinkText href={text.link.url}>{text.content}</LinkText>
        ) : (
          text.content
        )}
      </TextSpan>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <Paragraph>
          <Text text={value.rich_text} />
        </Paragraph>
      );
    case 'heading_1':
      return (
        <H1>
          <Text text={value.rich_text} />
        </H1>
      );
    case 'heading_2':
      return (
        <H2>
          <Text text={value.rich_text} />
        </H2>
      );
    case 'heading_3':
      return (
        <H3>
          <Text text={value.rich_text} />
        </H3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <List>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </List>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <HR key={id} />;
    case 'quote':
      return (
        <BlockQuote key={id}>
          {value.rich_text && value.rich_text[0].plain_text}
        </BlockQuote>
      );
    case 'code':
      return (
        <SyntaxHighlighter language={value.language} style={dracula}>
          {value.rich_text[0].plain_text}
        </SyntaxHighlighter>
      );
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      const href = value.url;
      return (
        <LinkText href={href} target="_brank">
          {href}
        </LinkText>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <PostWrapper>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.container}>
        <Link href="/">
          <GoBack>← Go Back</GoBack>
        </Link>
        <H1>
          <Text text={page.properties.Name.title} />
        </H1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
      <EmptySpaceHolder style={{ marginBottom: '50px' }} />
    </PostWrapper>
  );
}

export const getStaticPaths = async () => {
  const database = await fetchDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await fetchPage(id);
  const blocks = await fetchBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await fetchBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};

const PostWrapper = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;
const TextSpan = styled.span`
  font-size: ${(p) => (p.styles.code ? '16px' : '18px')};
  color: ${({ theme, styles: { color, code } }) =>
    code
      ? '#EB1D36'
      : color === 'default'
      ? theme.black
      : theme.notionColors[color]};

  font-weight: ${({ theme, styles: { bold } }) =>
    bold ? theme.fontWeight.bold : theme.fontWeight.normal};

  font-style: ${(p) => (p.styles.italic ? 'italic' : null)};

  text-decoration: ${(p) => (p.styles.underline ? 'underline' : null)};

  text-decoration: ${(p) => (p.styles.strikethrough ? 'line-through' : null)};

  background-color: ${(p) => (p.styles.code ? '#eeebf2' : null)};

  padding: ${(p) => (p.styles.code ? '2px 4px' : null)};

  border-radius: ${(p) => (p.styles.code ? '4px' : null)};
`;

const H1 = styled.h1`
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl5};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

const H2 = styled.h2`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl3};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

const H3 = styled.h3`
  margin-top: 32px;
  span {
    color: ${(p) => p.theme.darkgray};
    font-size: ${(p) => p.theme.font.xl2};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
  }
`;

const Paragraph = styled.div`
  margin-top: 16px;
`;

const HR = styled.hr`
  margin-top: 32px;
  color: ${(p) => p.theme.gray};
  opacity: 0.3;
`;

const LinkText = styled.a`
  font-size: 18px;
  font-weight: ${(p) => p.theme.fontWeight.normal};
  text-decoration: underline;
  text-decoration-color: ${(p) => p.theme.gray};
  color: ${(p) => p.theme.darkgray};
  opacity: 0.8;
`;

const List = styled.li`
  margin-top: 12px;
`;

const GoBack = styled.a`
  display: block;
  font-size: ${(p) => p.theme.font.xl};
  color: ${(p) => p.theme.gray};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  opacity: 0.8;
  margin-top: 50px;
  cursor: pointer;
`;

const BlockQuote = styled.blockquote`
  border-left: 5px solid black;
  padding-left: 15px;
`;

const CodeBlock = styled.pre`
  padding: 20px;
  font-family: monospace;
  display: flex;
  flex-wrap: wrap;
`;

const Code = styled.code`
  font-family: monospace;
  background-color: rgb(242, 242, 242);
  padding: 2px 4px;
  border-radius: 2px;
`;
