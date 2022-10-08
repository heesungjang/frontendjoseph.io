const siteUrl = 'https://heelog.dev';
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
