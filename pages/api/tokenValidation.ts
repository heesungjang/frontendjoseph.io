import { Client } from '@notionhq/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { token, type },
    method,
  } = req;
  switch (method) {
    case 'GET': {
      if (type === 'all') {
        if (validateToken(token)) {
          const { results } = await notion.databases.query({
            database_id: databaseId!,
          });

          if (!results) {
            return res.status(200).json({ revalidated: true });
          } else {
            const pages: Promise<any>[] = [];
            results.forEach((page) => {
              pages.push(res.revalidate(`/${page.id}`));
            });

            await res.revalidate('/');
            Promise.all(pages).then(() => {
              res.status(200).json({ revalidated: true });
            });
          }
        } else {
          res.status(498).json({ msg: 'invalid token' });
        }
      }
      if (type === 'single') {
        if (validateToken(token)) {
          res.revalidate(`/${req.body.id}`).then(() => {
            res.status(200).json({ revalidated: true });
          });
        }
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function validateToken(token: string) {
  return token === process.env.REVALIDATION_TOKEN;
}
