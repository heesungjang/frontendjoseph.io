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
      if (
        page.properties.Name.type === 'title' &&
        page.properties.Name?.title[0]?.plain_text
      ) {
        posts.push({
          cover:
            page.cover?.type === 'external' && page.cover.external.url
              ? page.cover.external.url
              : '',
          title:
            page.properties.Name.type === 'title' &&
            page.properties.Name?.title[0]?.plain_text,
          tags:
            page.properties.Tags.type === 'multi_select'
              ? page.properties.Tags.multi_select
              : '',
          description:
            page.properties.Description.type === 'rich_text' &&
            page.properties.Description?.rich_text[0]?.plain_text
              ? page.properties.Description?.rich_text[0]?.plain_text
              : '',
          isHidden:
            page.properties.hidden.type === 'checkbox'
              ? page.properties.hidden.checkbox
              : false,
          date:
            page.properties.Date.type === 'date' &&
            page.properties.Date.date?.start
              ? page.properties.Date.date?.start
              : '',
          id: page.id,
        });
      }
    }
  }

  posts.sort(
    (objA, objB) => Number(new Date(objB.date)) - Number(new Date(objA.date))
  );

  return { posts };
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

export const fetchDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};
