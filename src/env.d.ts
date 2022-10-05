/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module 'mermaid/dist/mermaid.core.js'
declare module 'element-resize-detector'
declare module 'popper.js/dist/esm/popper'
declare module '@marktext/file-icons'
declare module 'unsplash-js'
declare module 'joplin-turndown-plugin-gfm'
declare module 'snabbdom'
declare module 'snabbdom-to-html'
