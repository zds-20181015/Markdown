export interface Block {
  type: string
  functionType: string
  text: string
  [key: string]: any
}
interface IContentState {
  blocks: Block[]
  set selectedTableCells(info: string)
  get selectedTableCells()
  init(): void
  getHistory(): {
    stack: any
    index: any
  }
  setHistory({ stack, index }: any): void
  setCursor(): void
  setNextRenderRange(): void
  postRender(): void
  resizeLineNumber(): void
  render(isRenderCursor?: boolean, clearCache?: boolean): void
  partialRender(isRenderCursor?: boolean): void
  singleRender(block: any, isRenderCursor?: boolean): void
  createBlock(type?: string, extras?: any): Block
  createBlockP(text?: string): Block
  isCollapse(cursor?: any): boolean
  getBlocks(): Block[]
  getCursor(): any
  getBlock(key: string): Block
  copyBlock(origin: any): any
  getParent(block: Block): Block
  getParents(block: Block): Block[]
  getPreSibling(block: Block): Block
  getNextSibling(block: Block): Block
  isInclude(parent: Block, target: Block): boolean
  removeTextOrBlock(block: Block): void
  removeBlocks(
    before: Block,
    after: Block,
    isRemoveAfter?: boolean,
    isRecursion?: boolean
  ): void
  getActiveBlocks(): Block[]
  insertAfter(newBlock: Block, oldBlock: Block): void
  insertBefore(newBlock: Block, oldBlock: Block): void
  findOutMostBlock(block: Block): Block
  findIndex(children: Block[], block: Block): number
  prependChild(parent: Block, block: Block): void
  appendChild(parent: Block, block: Block): void
  replaceBlock(newBlock: Block, oldBlock: Block): void
  canInserFrontMatter(block: Block): boolean
  isFirstChild(block: Block): boolean
  isLastChild(block: Block): boolean
  isOnlyChild(block: Block): boolean
  isOnlyRemoveableChild(block: Block): boolean
  getLastChild(block: any): any
  firstInDescendant(block: any): any
  lastInDescendant(block: any): any
  findPreBlockInLocation(block: any): any
  findNextBlockInLocation(block: any): any
  getPositionReference(): {
    getBoundingClientRect(): {
      x: number
      y: number
      top: number
      left: number
      right: number
      bottom: number
      height: number
      width: number
    }
    clientWidth: number
    clientHeight: number
    id: any
  }
  getFirstBlock(): Block
  getLastBlock(): Block
  closest(block: any, type: any): any
  getAnchor(block: any): any
  getAnchor(block: any): any
  clear(): void
}

interface IInputCtrl extends IContentState {
  checkQuickInsert(block: Block): boolean
  checkCursorInTokenType(
    functionType: string,
    text: string,
    offset: string,
    type: string
  ): boolean
  checkNotSameToken(
    functionType: string,
    oldText: string,
    text: string
  ): boolean
  inputHandler(event: InputEvent, notEqual?: boolean): any
}
