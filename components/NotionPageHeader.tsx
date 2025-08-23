import Link from 'next/link'
import type * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)} onClick={onToggleTheme}>
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

const HARD_NAV = [
  { title: 'Blog', href: '/blog' },
  { title: 'Tools', href: '/tools' },
  { title: 'Services', href: '/services' },
  { title: 'Consulting', href: '/consulting' },
  { title: 'About', href: '/about' }
]

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  const links = (navigationLinks?.length ? navigationLinks : null) as
    | { title: string; pageId?: string; url?: string }[]
    | null

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
          zIndex: 2_147_483_647 // fix
        }}
      >
        <Link href="/" style={{ color: '#fff', fontWeight: 700, marginRight: 12 }}>LCB</Link>

        {links
          ? links.map((link, i) =>
              link.pageId ? (
                <components.PageLink
                  key={i}
                  href={mapPageUrl(link.pageId)}
                  className={cs(styles.navLink, 'breadcrumb', 'button')}
                >
                  {link.title}
                </components.PageLink>
              ) : link.url ? (
                <a key={i} href={link.url} className={cs(styles.navLink, 'breadcrumb', 'button')} style={{ color: '#fff' }}>
                  {link.title}
                </a>
              ) : null
            )
          : HARD_NAV.map((item) => (
              <Link key={item.href} href={item.href} style={{ color: '#fff' }}>
                {item.title}
              </Link>
            ))}
      </nav>

      <div style={{ height: 56 }} />

      <header className="notion-header">
        <div className="notion-nav-header">
          <Breadcrumbs block={block} rootOnly={true} />
          <div className="notion-nav-header-rhs breadcrumbs">
            <ToggleThemeButton />
            {isSearchEnabled && <Search block={block} title={null} />}
          </div>
        </div>
      </header>
    </>
  )
}
