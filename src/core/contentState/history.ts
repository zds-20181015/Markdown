import { deepCopy } from '../utils'
import { UNDO_DEPTH } from '../config'

class History {
  stack: any
  index: number
  contentState: any
  pending: any
  constructor(contentState: any) {
    this.stack = []
    this.index = -1
    this.contentState = contentState
    this.pending = null
  }

  undo() {
    this.commitPending()
    if (this.index > 0) {
      this.index = this.index - 1

      const state = deepCopy(this.stack[this.index])
      const { blocks, cursor, renderRange } = state
      cursor.noHistory = true
      this.contentState.blocks = blocks
      this.contentState.renderRange = renderRange
      this.contentState.cursor = cursor
      this.contentState.render()
    }
  }

  redo() {
    this.pending = null
    const { index, stack } = this
    const len = stack.length
    if (index < len - 1) {
      this.index = index + 1
      const state = deepCopy(stack[this.index])
      const { blocks, cursor, renderRange } = state
      cursor.noHistory = true
      this.contentState.blocks = blocks
      this.contentState.renderRange = renderRange
      this.contentState.cursor = cursor
      this.contentState.render()
    }
  }

  push(state: any) {
    this.pending = null
    this.stack.splice(this.index + 1)
    const copyState: any = deepCopy(state)
    this.stack.push(copyState)
    if (this.stack.length > UNDO_DEPTH) {
      this.stack.shift()
      this.index = this.index - 1
    }
    this.index = this.index + 1
  }

  pushPending(state: any) {
    this.pending = state
  }

  commitPending() {
    if (this.pending) {
      this.push(this.pending)
    }
  }

  clearHistory() {
    this.stack = []
    this.index = -1
    this.pending = null
  }
}

export default History
