import type { MetadataRoute } from 'next'
import { articles } from '@/app/lib/articles'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com'
const locales = ['en', 'lo', 'es'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/articles', priority: 0.8, freq: 'weekly' },
    { path: '/cv', priority: 0.8, freq: 'monthly' },
    { path: '/websites', priority: 0.8, freq: 'monthly' },
  ]
  const projectSlugs = ['orderbridge', 'tourism-website-seo', 'real-estate-website-laos', 'inonout']
  const publishedArticles = articles.filter((a) => a.published)

  return [
    ...locales.flatMap((locale) =>
      staticRoutes.map(({ path, priority, freq }) => ({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: freq as MetadataRoute.Sitemap[0]['changeFrequency'],
        priority,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
        },
      }))
    ),
    ...locales.flatMap((locale) =>
      projectSlugs.map((slug) => ({
        url: `${SITE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/projects/${slug}`])),
        },
      }))
    ),
    ...locales.flatMap((locale) =>
      publishedArticles.map((article) => ({
        url: `${SITE_URL}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/articles/${article.slug}`])),
        },
      }))
    ),
  ]
}
