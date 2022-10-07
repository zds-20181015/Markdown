import { normalizePastedHTML, checkCopyType } from '@/lib/utils/paste'
import ScrollPage from '@/lib/block/scrollPage'
import { URL_REG } from '@/lib/config'
import HtmlToMarkdown from '@/lib/jsonState/htmlToMarkdown'
import MarkdownToState from '@/lib/jsonState/markdownToState'

export default {
  async pasteHandler(event) {
    event.preventDefault()
    event.stopPropagation()

    const { muya } = this
    const {
      bulletListMarker,
      footnote,
      isGitlabCompatibilityEnabled,
      superSubScript,
      trimUnnecessaryCodeBlockEmptyLines,
      frontMatter
    } = muya.options

    const contentBlock = this.getTargetBlock(event)
    if (!contentBlock) {
      return
    }

    const text = event.clipboardData.getData('text/plain')
    let html = event.clipboardData.getData('text/html')

    // Support pasted URLs from Firefox.
    if (URL_REG.test(text) && !/\s/.test(text) && !html) {
      html = `<a href="${text}">${text}</a>`
    }

    // Remove crap from HTML such as meta data and styles.
    html = await normalizePastedHTML(html)
    const copyType = checkCopyType(html, text, this.pasteType)

    const { start, end } = contentBlock.getCursor()
    const { text: content } = contentBlock
    let anchorBlock = contentBlock.getAnchor()

    if (/html|text/.test(copyType)) {
      let markdown =
        copyType === 'html'
          ? new HtmlToMarkdown({ bulletListMarker }).generate(html)
          : text

      if (/\n\n/.test(markdown)) {
        if (start.offset !== end.offset) {
          contentBlock.text =
            content.substring(0, start.offset) + content.substring(end.offset)
          contentBlock.update()
        }
        // Has multiple paragraphs.
        const states = new MarkdownToState({
          footnote,
          isGitlabCompatibilityEnabled,
          superSubScript,
          trimUnnecessaryCodeBlockEmptyLines,
          frontMatter
        }).generate(markdown)

        for (const state of states) {
          const newBlock = ScrollPage.loadBlock(state.name).create(muya, state)
          anchorBlock.parent.insertAfter(newBlock, anchorBlock)
          anchorBlock = newBlock
        }

        const cursorBlock = anchorBlock.firstContentInDescendant()
        const offset = cursorBlock.text.length
        cursorBlock.setCursor(offset, offset, true)
      } else {
        if (contentBlock.blockName === 'language-input') {
          markdown = markdown.replace(/\n/g, '')
        } else if (contentBlock.blockName === 'table.cell.content') {
          markdown = markdown.replace(/\n/g, '<br/>')
        }

        contentBlock.text =
          content.substring(0, start.offset) +
          markdown +
          content.substring(end.offset)
        const offset = start.offset + markdown.length
        contentBlock.setCursor(offset, offset, true)
      }
    } else {
      const state = {
        name: 'code-block',
        meta: {
          type: 'fenced',
          lang: 'html'
        },
        text
      }
      const newBlock = ScrollPage.loadBlock(state.name).create(muya, state)
      anchorBlock.parent.insertAfter(newBlock, anchorBlock)
      const offset = text.length

      newBlock.lastContentInDescendant().setCursor(offset, offset, true)
    }
  }
}
