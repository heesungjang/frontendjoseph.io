import {
  Client,
  isFullBlock,
  isFullDatabase,
  isFullPage,
} from '@notionhq/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

interface Page {
  id: string;
  name: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pages: Page[] = [];
  const { results } = await notion.databases.query({
    database_id: databaseId!,
  });

  results.forEach((p) => {
    if (isFullPage(p) && p.properties.Name.type === 'title') {
      pages.push({
        id: p.id,
        name: p.properties.Name.title[0].plain_text,
      });
    }
  });

  res.status(200).json({ pages });
}
