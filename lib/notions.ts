import { Client, isFullDatabase, isFullPage } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchFrontMatter = async (databaseId: string) => {
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });

  if (!isFullDatabase(response)) {
    return;
  }

  return response;
};

export const fetchPosts = async (databaseId: string) => {
  const posts = [];
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  for (const page of response.results) {
    if (!isFullPage(page)) {
      continue;
    } else {
      posts.push(page);
    }
  }

  return posts;
};

export const fetchPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const fetchBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor: string | undefined;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
