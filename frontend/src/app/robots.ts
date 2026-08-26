import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // '*' mane shob dhoroner search engine bot-ke allow kora hocche
      allow: '/', // bot pura website-er shob jaygay jete parbe
      disallow: '/admin/', // jodi tomar kono admin dashbaord thake, tobe seta bot theke hide korar jonno
    },
    // Sitemap-er link-tao ekhane bole dite hoy
    sitemap: 'https://boostnix.edufuze.com/sitemap.xml',
  }
}