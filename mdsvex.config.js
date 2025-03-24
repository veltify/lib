// mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex'

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [examples],
  rehypePlugins: []
})

export default config