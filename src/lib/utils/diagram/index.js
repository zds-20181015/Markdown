const rendererCache = new Map()
/**
 *
 * @param {string} name the renderer name: sequence, plantuml, flowchart, mermaid, vega-lite
 */
const loadRenderer = async (name) => {
  if (!rendererCache.has(name)) {
    let m
    switch (name) {
      case 'sequence':
        m = await import('./sequence')
        rendererCache.set(name, m.default)
        break

      case 'plantuml':
        m = await import('./plantuml')
        rendererCache.set(name, m.default)
        break

      case 'flowchart':
        m = await import('flowchart.js')
        rendererCache.set(name, m.default)
        break

      case 'mermaid':
        m = await import('mermaid/dist/mermaid.core.js')
        rendererCache.set(name, m.default)
        break

      case 'vega-lite':
        m = await import('vega-embed')
        rendererCache.set(name, m.default)
        break
      default:
        throw new Error(`Unknown diagram name ${name}`)
    }
  }

  return rendererCache.get(name)
}

export default loadRenderer
