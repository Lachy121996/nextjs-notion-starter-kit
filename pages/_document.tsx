import { IconContext } from '@react-icons/all-files'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  override render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang="en">
          <Head>
            {/* Favicons */}
            <link rel="icon" href="/lcb-favicon.svg" type="image/svg+xml" />
            <link rel="icon" href="/lcb-favicon-32.png" sizes="32x32" type="image/png" />
            <link rel="icon" href="/lcb-favicon-16.png" sizes="16x16" type="image/png" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* PWA manifest (optional) */}
            <link rel="manifest" href="/manifest.json" />
          </Head>

          <body>
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
                zIndex: 2147483647
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
                __html: `/* dark mode bootstrap (unchanged) */;(function(){var s='darkMode',d='dark-mode',l='light-mode';function a(n){document.body.classList.add(n?d:l);document.body.classList.remove(n?l:d)}var q='(prefers-color-scheme: dark)',m=window.matchMedia(q),c=m.media===q,t=null;try{t=localStorage.getItem(s)}catch(e){}var e=t!==null;if(e){t=JSON.parse(t)}if(e){a(t)}else if(c){a(m.matches);localStorage.setItem(s,m.matches)}else{var k=document.body.classList.contains(d);localStorage.setItem(s,JSON.stringify(k))}})();`
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
