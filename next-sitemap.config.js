const siteUrl = 'https://frontendjoseph.io';
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
