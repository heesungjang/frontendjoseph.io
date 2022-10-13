import {
  BlockQuote,
  CalloutBulb,
  CalloutWrapper,
  H1,
  H2,
  H3,
  HR,
  ImageWrapper,
  LinkText,
  List,
  Paragraph,
  PostImage,
  Summary,
  TextSpan,
} from './styles';

import { Fragment } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, idx) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    return (
      <TextSpan
        key={idx}
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

export const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block) => Block(block))}</ol>;
  }
  return <ul>{value.children.map((block) => Block(block))}</ul>;
};

export const Block = (block) => {
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
          <Summary>
            <Text text={value.rich_text} />
          </Summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{Block(block)}</Fragment>
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
        <ImageWrapper>
          <PostImage
            src={`/api/imageProxy?imageUrl=${src}`}
            layout="fill"
            alt={caption ? caption : 'image'}
            priority
          />
          {caption && <figcaption>{caption}</figcaption>}
        </ImageWrapper>
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
        <SyntaxHighlighter
          language={value.language}
          style={dracula}
          customStyle={{ lineHeight: '0.75', fontSize: '13px' }}
        >
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
    case 'callout':
      return (
        <CalloutWrapper>
          <CalloutBulb>💡</CalloutBulb>
          <Text key={value.id} text={value.rich_text} />
        </CalloutWrapper>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
