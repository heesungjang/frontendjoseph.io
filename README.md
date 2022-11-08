# FrontendJoseph

**Visit my blog** @ [**here**](https://frontendjoseph.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Notion](https://developers.notion.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **CLI**: [oclif](https://oclif.io)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Styled-Components](https://styled-components.com/)
- **3D**: [Three.JS](https://threejs.org/)

## Overview

- `components/*` - Building block components with styles and test.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external and internal services.
- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction) have some server side codes.
- `pages/*` - Static pre-rendered blog pages using data quried from Notion table.
- `pages/sitemap.xml.tsx` - Automatically generated sitemap.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using styled-components with bit of framer for transition animation.

## Running Locally

This application requires Node.js v16.13+.

```bash
git clone https://github.com/heesungjang/frontendjoseph.io.git
cd frontendjoseph.io
yarn i
yarn run dev
```
