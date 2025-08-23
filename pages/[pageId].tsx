/* eslint-disable simple-import-sort/imports */
import type { GetStaticPaths, GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { domain, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import type { PageProps, Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (ctx) => {
  const rawPageId = ctx.params?.pageId as string | undefined
  if (!rawPageId) return { notFound: true, revalidate: 60 }

  try {
    const props = await resolveNotionPage(domain, rawPageId)
    return { props, revalidate: 60 }
  } catch {
    if (isDev) console.error('Notion page error:', { domain, rawPageId })
    return { notFound: true, revalidate: 30 }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (isDev) return { paths: [], fallback: 'blocking' }
  const siteMap = await getSiteMap()
  const paths = Object.keys(siteMap.canonicalPageMap).map((pageId) => ({ params: { pageId } }))
  return { paths, fallback: 'blocking' }
}

export default function NotionDomainDynamicPage(props: PageProps) {
  return <NotionPage {...props} />
}
