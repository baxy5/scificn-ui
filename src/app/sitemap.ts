import type { MetadataRoute } from 'next'

const base = 'https://www.scificn.dev'
const components = ['alert','badge','bar-chart','breadcrumb','button','card','checkbox','dialog','grid','heatmap','input','kbd','label','line-chart','node-graph','panel','progress','progress-ring','radar-chart','select','separator','skeleton','spinner','stat-card','status-grid','switch','tabs','terminal','textarea','toast','tooltip','typography']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/docs/introduction`, lastModified: new Date() },
    { url: `${base}/docs/installation`, lastModified: new Date() },
    { url: `${base}/docs/theming`, lastModified: new Date() },
    { url: `${base}/showcase`, lastModified: new Date() },
    { url: `${base}/showcase/charts`, lastModified: new Date() },
    { url: `${base}/showcase/mission-control`, lastModified: new Date() },
    { url: `${base}/showcase/star-wars`, lastModified: new Date() },
    { url: `${base}/showcase/alien`, lastModified: new Date() },
    { url: `${base}/showcase/sci-fi`, lastModified: new Date() },
    ...components.map(c => ({ url: `${base}/components/${c}`, lastModified: new Date() })),
  ]
}
