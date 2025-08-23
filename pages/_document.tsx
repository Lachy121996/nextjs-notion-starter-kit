import { IconContext } from '@react-icons/all-files'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  override render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang="en">
          <Head>
            {/* --- Favicons --- */}
            {/* Your chosen SVG favicon (rename your file to /public/lcb-favicon.svg) */}
            <link rel="icon" href="/lcb-favicon.svg" type="image/svg+xml" />
            {/* Optional PNG fallbacks if you have them */}
            <link rel="icon" href="/lcb-favicon-32.png" sizes="32x32" type="image/png" />
            <link rel="icon" href="/lcb-favicon-16.png" sizes="16x16" type="image/png" />
            {/* Optional older fallback */}
            <link rel="shortcut icon" href="/favicon.ico" />
            {/* Apple touch icon if present */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* PWA manifest (optional) */}
            <link rel="manifest" href="/manifest.json" />
          </Head>

          <body>
            {/* fixed nav (server-rendered) */}
            <div
              id="hard-nav"
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
                // use scientific notation to avoid ESLint numeric-separators rule
                zIndex: 2e9
              }}
            >
              <a href="/" style={{ color: '#fff', fontWeight: 700, marginRight: 12 }}>LCB</a>
              <a href="/blog" style={{ color: '#fff' }}>Blog</a>
              <a href="/tools" style={{ color: '#fff' }}>Tools</a>
              <a href="/services" style={{ color: '#fff' }}>Services</a>
              <a href="/consulting" style={{ color: '#fff' }}>Consulting</a>
              <a href="/about" style={{ color: '#fff' }}>About</a>
            </div>
            <div style={{ height: 56 }} />

            <script
              dangerouslySetInnerHTML={{
                __html: `
;(function () {
  var storageKey = 'darkMode'
  var classNameDark = 'dark-mode'
  var classNameLight = 'light-mode'
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight)
    document.body.classList.remove(darkMode ? classNameLight : classNameDark)
  }
  var preferDarkQuery = '(prefers-color-scheme: dark)'
  var mql = window.matchMedia(preferDarkQuery)
  var supportsColorSchemeQuery = mql.media === preferDarkQuery
  var localStorageTheme = null
  try { localStorageTheme = localStorage.getItem(storageKey) } catch (err) {}
  var localStorageExists = localStorageTheme !== null
  if (localStorageExists) { localStorageTheme = JSON.parse(localStorageTheme) }
  if (localStorageExists) {
    setClassOnDocumentBody(localStorageTheme)
  } else if (supportsColorSchemeQuery) {
    setClassOnDocumentBody(mql.matches)
    localStorage.setItem(storageKey, mql.matches)
  } else {
    var isDarkMode = document.body.classList.contains(classNameDark)
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
  }
})();`
              }}
            />
            <Main />
            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
