// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// global styles shared across the entire site
import 'styles/global.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import type { AppProps } from 'next/app'
import Link from 'next/link'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { posthog } from 'posthog-js'
import * as React from 'react'

import { bootstrap } from '@/lib/bootstrap-client'
import { fathomConfig, fathomId, isServer, posthogConfig, posthogId } from '@/lib/config'

if (!isServer) {
  bootstrap()
}

// Top nav config
const NAV = [
  { title: 'Blog',       href: '/blog' },
  { title: 'Tools',      href: '/tools' },
  { title: 'Services',   href: '/services' },
  { title: 'Consulting', href: '/consulting' },
  { title: 'About',      href: '/about' }
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
    console.log('[custom-nav] mounted, route:', router.asPath)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  const linkStyle = (href: string): React.CSSProperties => ({
    color: '#fff',
    opacity: router.asPath.startsWith(href) ? 1 : 0.85,
    fontWeight: router.asPath.startsWith(href) ? 700 as any : 500
  })

  return (
    <>
      {/* Fixed, always-on-top nav */}
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
          zIndex: 2147483647 // higher than anything in the kit
        }}
      >
        <Link href="/" style={{ color: '#fff', fontWeight: 700, marginRight: 12 }}>
          Lachlan
        </Link>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} style={linkStyle(item.href)}>
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Spacer so content isn't hidden under the fixed nav */}
      <div style={{ height: 56 }} />

      <Component {...pageProps} />
    </>
  )
}
