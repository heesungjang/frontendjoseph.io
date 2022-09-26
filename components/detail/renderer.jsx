import {
  BlockQuote,
  H1,
  H2,
  H3,
  HR,
  LinkText,
  List,
  Paragraph,
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
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

export const renderBlock = (block) => {
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
          <img
            src={src}
            alt={caption}
            style={{ width: '100%', height: 'auto' }}
          />
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
