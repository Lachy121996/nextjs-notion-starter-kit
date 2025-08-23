import { siteConfig } from './lib/site-config'

export default siteConfig({
  rootNotionPageId: '2561f7289de980a9953de5ee7fb1c1fe',
  rootNotionSpaceId: null,

  name: 'Lachlan’s Blog',
  domain: 'localhost',
  author: 'Lachlan Barrett',
  description: 'SEO-driven hub built with Next.js + Notion',

  isPreviewImageSupportEnabled: true,
  isRedisEnabled: false,

  pageUrlOverrides: {
    '/about':      '2561f7289de981f69690f2875fb64687',
    '/tools':      '2581f7289de980b48138c74364348448',
    '/consulting': '2561f7289de981ddb9fcf0e2670f83cb',
    '/services':   '2571f7289de9805fb0c5dfcbeb36daa5',
    '/blog':       '2581f7289de980e2a275f4098ec35a0d'
  },

  navigationStyle: 'custom',
  navigationLinks: [
    { title: 'Blog',       pageId: '2581f7289de980e2a275f4098ec35a0d' },
    { title: 'Tools',      pageId: '2581f7289de980b48138c74364348448' },
    { title: 'Services',   pageId: '2571f7289de9805fb0c5dfcbeb36daa5' },
    { title: 'Consulting', pageId: '2561f7289de981ddb9fcf0e2670f83cb' },
    { title: 'About',      pageId: '2561f7289de981f69690f2875fb64687' }
  ]
})
