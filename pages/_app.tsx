/* eslint-disable simple-import-sort/imports */
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-coy.css'
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
import 'styles/notion.css'
import 'styles/prism-theme.css'

import * as Fathom from 'fathom-client'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { posthog } from 'posthog-js'
import * as React from 'react'

import { bootstrap } from '@/lib/bootstrap-client'
import { fathomConfig, fathomId, isServer, posthogConfig, posthogId } from '@/lib/config'

if (!isServer) {
  bootstrap()
}

const NAV = [
  { title: 'Blog', href: '/blog' },
  { title: 'Tools', href: '/tools' },
  { title: 'Services', href: '/services' },
  { title: 'Consulting', href: '/consulting' },
  { title: 'About', href: '/about' }
]

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) Fathom.trackPageview()
      if (posthogId) posthog.capture('$pageview')
    }

    if (fathomId) Fathom.load(fathomId, fathomConfig)
    if (posthogId) posthog.init(posthogId, posthogConfig)

    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events, router.asPath]) // include asPath to satisfy react-hooks rule

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0 16px',
          background: '#111',
          color: '#fff',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 2_147_483_647 // numeric separators fix
        }}
      >
        <Link href="/" style={{ color: '#fff', fontWeight: 700, marginRight: 12 }}>
          LCB
        </Link>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} style={{ color: '#fff', opacity: 0.9 }}>
            {item.title}
          </Link>
        ))}
      </nav>

      <div style={{ height: 56 }} />
      <Component {...pageProps} />
    </>
  )
}
