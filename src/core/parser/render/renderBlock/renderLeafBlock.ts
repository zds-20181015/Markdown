/* eslint-disable @typescript-eslint/ban-ts-comment */
import katex from 'katex'
import prism, { loadedLanguages, transformAliasToOrigin } from '../../../prism'
import 'katex/dist/contrib/mhchem.min.js'
import {
  CLASS_OR_ID,
  DEVICE_MEMORY,
  PREVIEW_DOMPURIFY_CONFIG,
  HAS_TEXT_BLOCK_REG
} from '../../../config'
import { tokenizer } from '../..'
import {
  snakeToCamel,
  sanitize,
  escapeHTML,
  getLongUniqueId,
  getImageInfo
} from '../../../utils'
import { h, htmlToVNode, toHTML } from '../snabbdom'

// todo@jocs any better solutions?
const MARKER_HASK = {
  '<': `%${getLongUniqueId()}%`,
  '>': `%${getLongUniqueId()}%`,
  '"': `%${getLongUniqueId()}%`,
  "'": `%${getLongUniqueId()}%`
}

const getHighlightHtml = (
  text: any,
  highlights: any,
  escape = false,
  handleLineEnding = false
) => {
  let code = ''
  let pos = 0
  const getEscapeHTML = (className: string, content: string) => {
    return `${MARKER_HASK['<']}span class=${MARKER_HASK['"']}${className}${MARKER_HASK['"']}${MARKER_HASK['>']}${content}${MARKER_HASK['<']}/span${MARKER_HASK['>']}`
  }

  for (const highlight of highlights) {
    const { start, end, active } = highlight
    code += text.substring(pos, start)
    const className = active ? 'ag-highlight' : 'ag-selection'
    let highlightContent = text.substring(start, end)
    if (handleLineEnding && text.endsWith('\n') && end === text.length) {
      highlightContent =
        highlightContent.substring(start, end - 1) +
        (escape
          ? getEscapeHTML('ag-line-end', '\n')
          : '<span class="ag-line-end">\n</span>')
    }
    code += escape
      ? getEscapeHTML(className, highlightContent)
      : `<span class="${className}">${highlightContent}</span>`
    pos = end
  }
  if (pos !== text.length) {
    if (handleLineEnding && text.endsWith('\n')) {
      code +=
        text.substring(pos, text.length - 1) +
        (escape
          ? getEscapeHTML('ag-line-end', '\n')
          : '<span class="ag-line-end">\n</span>')
    } else {
      code += text.substring(pos)
    }
  }
  return escapeHTML(code)
}

const hasReferenceToken = (tokens: any) => {
  let result = false
  const travel = (tokens: any) => {
    for (const token of tokens) {
      if (/reference_image|reference_link/.test(token.type)) {
        result = true
        break
      }
      if (Array.isArray(token.children) && token.children.length) {
        travel(token.children)
      }
    }
  }
  travel(tokens)
  return result
}

export default function renderLeafBlock(
  this: any,
  parent: any,
  block: any,
  activeBlocks: any,
  matches: any,
  useCache = false
) {
  const { loadMathMap } = this
  const { cursor } = this.muya.contentState
  let selector = this.getSelector(block, activeBlocks)
  // highlight search key in block
  const highlights = matches.filter((m: any) => m.key === block.key)
  const { text, type, checked, key, lang, functionType, editable } = block

  const data = {
    props: {},
    attrs: {},
    dataset: {},
    style: {}
  }

  let children: any = ''

  if (text) {
    let tokens = []
    if (highlights.length === 0 && this.tokenCache.has(text)) {
      tokens = this.tokenCache.get(text)
    } else if (
      HAS_TEXT_BLOCK_REG.test(type) &&
      functionType !== 'codeContent' &&
      functionType !== 'languageInput'
    ) {
      const hasBeginRules = /paragraphContent|atxLine/.test(functionType)

      tokens = tokenizer(text, {
        highlights,
        hasBeginRules,
        labels: this.labels,
        options: this.muya.options
      })
      const hasReferenceTokens = hasReferenceToken(tokens)
      if (
        highlights.length === 0 &&
        useCache &&
        DEVICE_MEMORY >= 4 &&
        !hasReferenceTokens
      ) {
        this.tokenCache.set(text, tokens)
      }
    }
    children = tokens.reduce(
      (acc: any, token: any) => [
        ...acc,
        ...this[snakeToCamel(token.type)](h, cursor, block, token)
      ],
      []
    )
  }

  if (editable === false) {
    Object.assign(data.attrs, {
      spellcheck: 'false',
      contenteditable: 'false'
    })
  }

  if (type === 'div') {
    const code = this.codeCache.get(block.preSibling)
    switch (functionType) {
      case 'html': {
        selector += `.${CLASS_OR_ID.AG_HTML_PREVIEW}`
        Object.assign(data.attrs, { spellcheck: 'false' })

        const { disableHtml } = this.muya.options
        const htmlContent = sanitize(
          code,
          PREVIEW_DOMPURIFY_CONFIG,
          disableHtml
        )

        // handle empty html bock
        //@ts-ignore
        if (/^<([a-z][a-z\d]*)[^>]*?>(\s*)<\/\1>$/.test(htmlContent.trim())) {
          children = htmlToVNode(
            '<div class="ag-empty">&lt;Empty HTML Block&gt;</div>'
          )
        } else {
          const parser = new DOMParser()
          //@ts-ignore
          const doc = parser.parseFromString(htmlContent, 'text/html')
          const imgs: any = doc.documentElement.querySelectorAll('img')
          for (const img of imgs) {
            const src = img.getAttribute('src')
            const imageInfo = getImageInfo(src)
            img.setAttribute('src', imageInfo.src)
          }

          children = htmlToVNode(
            // @ts-ignore
            doc.documentElement.querySelector('body').innerHTML
          )
        }
        break
      }
      case 'multiplemath': {
        const key = `${code}_display_math`
        selector += `.${CLASS_OR_ID.AG_CONTAINER_PREVIEW}`
        Object.assign(data.attrs, { spellcheck: 'false' })
        if (code === '') {
          children = '< Empty Mathematical Formula >'
          selector += `.${CLASS_OR_ID.AG_EMPTY}`
        } else if (loadMathMap.has(key)) {
          children = loadMathMap.get(key)
        } else {
          try {
            const html = katex.renderToString(code, {
              displayMode: true
            })

            children = htmlToVNode(html)
            loadMathMap.set(key, children)
          } catch (err) {
            children = '< Invalid Mathematical Formula >'
            selector += `.${CLASS_OR_ID.AG_MATH_ERROR}`
          }
        }
        break
      }
      case 'mermaid': {
        selector += `.${CLASS_OR_ID.AG_CONTAINER_PREVIEW}`
        Object.assign(data.attrs, { spellcheck: 'false' })
        if (code === '') {
          children = '< Empty Mermaid Block >'
          selector += `.${CLASS_OR_ID.AG_EMPTY}`
        } else {
          children = 'Loading...'
          this.mermaidCache.set(`#${block.key}`, {
            code,
            functionType
          })
        }
        break
      }
      case 'flowchart':
      case 'sequence':
      case 'plantuml':
      case 'vega-lite': {
        selector += `.${CLASS_OR_ID.AG_CONTAINER_PREVIEW}`
        Object.assign(data.attrs, { spellcheck: 'false' })
        if (code === '') {
          children = '< Empty Diagram Block >'
          selector += `.${CLASS_OR_ID.AG_EMPTY}`
        } else {
          children = 'Loading...'
          this.diagramCache.set(`#${block.key}`, {
            code,
            functionType
          })
        }
        break
      }
    }
  } else if (type === 'input') {
    const { fontSize, lineHeight } = this.muya.options

    Object.assign(data.attrs, {
      type: 'checkbox',
      style: `top: ${((fontSize * lineHeight) / 2 - 8).toFixed(2)}px`
    })

    selector = `${type}#${key}.${CLASS_OR_ID.AG_TASK_LIST_ITEM_CHECKBOX}`
    if (checked) {
      Object.assign(data.attrs, {
        checked: true
      })
      selector += `.${CLASS_OR_ID.AG_CHECKBOX_CHECKED}`
    }
    children = ''
  } else if (type === 'span' && functionType === 'codeContent') {
    const code = getHighlightHtml(text, highlights, true, true)
      .replace(new RegExp(MARKER_HASK['<'], 'g'), '<')
      .replace(new RegExp(MARKER_HASK['>'], 'g'), '>')
      .replace(new RegExp(MARKER_HASK['"'], 'g'), '"')
      .replace(new RegExp(MARKER_HASK["'"], 'g'), "'")

    // transform alias to original language
    const transformedLang = transformAliasToOrigin([lang])[0]
    if (
      transformedLang &&
      /\S/.test(code) &&
      loadedLanguages.has(transformedLang)
    ) {
      const wrapper = document.createElement('div')
      wrapper.classList.add(`language-${transformedLang}`)
      wrapper.innerHTML = code
      prism.highlightElement(wrapper, false, () => {
        const highlightedCode = wrapper.innerHTML
        selector += `.language-${transformedLang}`
        children = htmlToVNode(highlightedCode)
      })
    } else {
      children = htmlToVNode(code)
    }
  } else if (type === 'span' && functionType === 'languageInput') {
    const escapedText = sanitize(text, PREVIEW_DOMPURIFY_CONFIG, true)
    const html = getHighlightHtml(escapedText, highlights, true)
    children = htmlToVNode(html)
  } else if (type === 'span' && functionType === 'footnoteInput') {
    Object.assign(data.attrs, { spellcheck: 'false' })
  }

  // console.log("children", toHTML(children));
  if (!block.parent) {
    return h(selector, data, [this.renderIcon(block), ...children])
  } else {
    return h(selector, data, children)
  }
}
