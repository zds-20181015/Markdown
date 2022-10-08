import { getOffsetOfParagraph, getTextContent } from './dom'
import { CLASS_NAMES } from '@/lib/config'
class Selection {
  /**
   * get the anchor and focus offset in paragraph
   */
  static getCursorOffsets(paragraph) {
    const { anchorNode, anchorOffset, focusNode, focusOffset } =
      document.getSelection()
    const aOffset = getOffsetOfParagraph(anchorNode, paragraph) + anchorOffset
    const fOffset = getOffsetOfParagraph(focusNode, paragraph) + focusOffset

    return {
      anchor: { offset: aOffset },
      focus: { offset: fOffset },
      start: { offset: Math.min(aOffset, fOffset) },
      end: { offset: Math.max(aOffset, fOffset) }
    }
  }

  /**
   * topOffset is the line counts above cursor, and bottomOffset is line counts bellow cursor.
   * @param {*} paragraph
   */
  static getCursorYOffset(paragraph) {
    const { y } = this.getCursorCoords()
    const { height, top } = paragraph.getBoundingClientRect()
    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight)
    const topOffset = Math.floor((y - top) / lineHeight)
    const bottomOffset = Math.round(
      (top + height - lineHeight - y) / lineHeight
    )

    return {
      topOffset,
      bottomOffset
    }
  }

  static getCursorCoords() {
    const sel = document.getSelection()
    let range
    let rect = null

    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()
      if (range.getClientRects) {
        // range.collapse(true)
        let rects = range.getClientRects()
        if (rects.length === 0) {
          rects =
            range.startContainer &&
            range.startContainer.nodeType === Node.ELEMENT_NODE
              ? range.startContainer.getClientRects()
              : []
        }

        if (rects.length) {
          rect = rects[0]
        }
      }
    }

    return rect
  }

  // https://stackoverflow.com/questions/1197401/
  // how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contenteditable
  // by You
  static getSelectionStart() {
    const node = document.getSelection().anchorNode
    const startNode = node && node.nodeType === 3 ? node.parentNode : node

    return startNode
  }

  get scrollPage() {
    return this.muya.editor.scrollPage
  }

  get start() {
    const { anchor, focus } = this

    return anchor.offset <= focus.offset ? anchor : focus
  }

  get end() {
    const { anchor, focus } = this

    return anchor.offset <= focus.offset ? focus : anchor
  }

  constructor(muya, { anchor, focus, path, block } = {}) {
    this.doc = document
    this.muya = muya
    this.path = path // the path of the block, used for query block if block is not existed.
    this.block = block
    this.anchor = anchor
    this.focus = focus
  }

  getSelection() {
    const { path, start, end, anchor, focus } = this

    return { path, start, end, anchor, focus }
  }

  setSelection({ anchor, focus, start, end, block, path }) {
    this.anchor = anchor || start
    this.focus = focus || end
    this.path = path
    this.block = block
    this.setCursor()

    this.muya.eventCenter.emit('selection-change', {
      anchor: this.anchor,
      focus: this.focus,
      path: this.path,
      block: this.block
    })
  }

  selectRange(range) {
    const selection = this.doc.getSelection()

    selection.removeAllRanges()
    selection.addRange(range)
  }

  select(startNode, startOffset, endNode, endOffset) {
    const range = this.doc.createRange()
    range.setStart(startNode, startOffset)
    if (endNode) {
      range.setEnd(endNode, endOffset)
    } else {
      range.collapse(true)
    }
    this.selectRange(range)

    return range
  }

  setFocus(focusNode, focusOffset) {
    const selection = this.doc.getSelection()
    selection.extend(focusNode, focusOffset)
  }

  setCursor() {
    const { anchor, focus, block, path, scrollPage } = this
    const pargraph = block ? block.domNode : scrollPage.queryBlock(path)

    const getNodeAndOffset = (node, offset) => {
      if (node.nodeType === 3) {
        return {
          node,
          offset
        }
      }

      const childNodes = node.childNodes
      const len = childNodes.length
      let i
      let count = 0

      for (i = 0; i < len; i++) {
        const child = childNodes[i]
        const textContent = getTextContent(child, [
          CLASS_NAMES.MU_MATH_RENDER,
          CLASS_NAMES.MU_RUBY_RENDER
        ])
        const textLength = textContent.length

        // Fix #1460 - put the cursor at the next text node or element if it can be put at the last of /^\n$/ or the next text node/element.
        if (
          /^\n$/.test(textContent) && i !== len - 1
            ? count + textLength > offset
            : count + textLength >= offset
        ) {
          if (
            child.classList &&
            child.classList.contains(`${CLASS_NAMES.MU_INLINE_IMAGE}`)
          ) {
            const imageContainer = child.querySelector(
              `.${CLASS_NAMES.MU_IMAGE_CONTAINER}`
            )
            const hasImg = imageContainer.querySelector('img')

            if (!hasImg) {
              return {
                node: child,
                offset: 0
              }
            }

            if (count + textLength === offset) {
              if (child.nextElementSibling) {
                return {
                  node: child.nextElementSibling,
                  offset: 0
                }
              } else {
                return {
                  node: imageContainer,
                  offset: 1
                }
              }
            } else if (count === offset && count === 0) {
              return {
                node: imageContainer,
                offset: 0
              }
            } else {
              return {
                node: child,
                offset: 0
              }
            }
          } else {
            return getNodeAndOffset(child, offset - count)
          }
        } else {
          count += textLength
        }
      }

      return { node, offset }
    }

    const { node: anchorNode, offset: anchorOffset } = getNodeAndOffset(
      pargraph,
      anchor.offset
    )
    const { node: focusNode, offset: focusOffset } = getNodeAndOffset(
      pargraph,
      focus.offset
    )

    // First set the anchor node and anchor offset, make it collapsed
    this.select(anchorNode, anchorOffset)
    // Secondly, set the focus node and focus offset.
    this.setFocus(focusNode, focusOffset)
  }
}

export default Selection
