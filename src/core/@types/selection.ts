export {}
interface ISelection {
  doc: Document
  findMatchingSelectionParent(testElementFunction: any, contentWindow: any): any
  importSelection(
    selectionState?: any,
    root?: any,
    favorLaterSelectionAnchor?: any
  ): void
  getSelectionHtml(): string
  chopHtmlByCursor(root: any):
    | {
        pre: any
        post: any
      }
    | undefined
  getCaretOffsets(
    element: HTMLElement,
    range?: Range
  ): {
    left: number
    right: number
  }
  selectNode(node: Node): void
  select(
    startNode: Node,
    startOffset?: number,
    endNode?: Node,
    endOffset?: number
  ): Range
  setFocus(focusNode: Node, focusOffset: number): void
  clearSelection(moveCursorToStart: boolean): void
  moveCursor(node: Node, offset: number): void
  getSelectionRange(): Range
  selectRange(range: Range): void
  getSelectionStart(): Node
  setCursorRange(cursorRange: Range): void
  isValidCursorNode(node: Node): boolean
  getCursorRange(node: unknown): Cursor
  getCursorYOffset(paragraph: any): {
    topOffset: number
    bottomOffset: number
  }
  getCursorCoords(): {
    x: number
    y: number
    width: number
  }
  getSelectionEnd(): Node | null | undefined
}
interface CursorObj {
  key: string
  offset: number
}
interface Cursor {
  anchor: CursorObj
  focus: CursorObj
  start: CursorObj
  end: CursorObj
  noHistory: boolean
}
