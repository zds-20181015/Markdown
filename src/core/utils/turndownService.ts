import TurndownService from 'turndown'
import { identity } from './index'

const turndownPluginGfm = import('joplin-turndown-plugin-gfm')

export const usePluginAddRules = (turndownService: any, keeps: any) => {
  // Use the gfm plugin
  const { gfm } = turndownPluginGfm as any
  turndownService.use(gfm)

  // We need a extra strikethrough rule because the strikethrough rule in gfm is single `~`.
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement(content: any) {
      return '~~' + content + '~~'
    }
  })

  turndownService.addRule('paragraph', {
    filter: 'p',

    replacement: function (content: any, node: any) {
      const isTaskListItemParagraph =
        node.previousElementSibling &&
        node.previousElementSibling.tagName === 'INPUT'

      return isTaskListItemParagraph
        ? content + '\n\n'
        : '\n\n' + content + '\n\n'
    }
  })

  turndownService.addRule('listItem', {
    filter: 'li',

    replacement: function (content: any, node: any, options: any) {
      content = content
        .replace(/^\n+/, '') // remove leading newlines
        .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
        .replace(/\n/gm, '\n  ') // indent

      let prefix = options.bulletListMarker + ' '
      const parent = node.parentNode
      if (parent.nodeName === 'OL') {
        const start = parent.getAttribute('start')
        const index = Array.prototype.indexOf.call(parent.children, node)
        prefix = (start ? Number(start) + index : index + 1) + '. '
      }
      return (
        prefix +
        content +
        (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
      )
    }
  })

  // Handle multiple math lines
  turndownService.addRule('multiplemath', {
    filter(node: any, options: any) {
      return node.nodeName === 'PRE' && node.classList.contains('multiple-math')
    },
    replacement(content: any, node: any, options: any) {
      return `$$\n${content}\n$$`
    }
  })

  turndownService.escape = identity
  turndownService.keep(keeps)
}

export default TurndownService
