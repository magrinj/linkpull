import { defineConfig } from 'wxt'

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkPull — Export LinkedIn Posts & More',
    description:
      'Extract, filter and export your LinkedIn posts and analytics. CSV, JSON, ZIP with images. Privacy-first, no server.',
    permissions: ['sidePanel', 'activeTab', 'scripting', 'storage'],
    host_permissions: ['https://www.linkedin.com/*', 'https://media.licdn.com/*'],
    homepage_url: 'https://github.com/magrinj/linkpull',
  },
})
