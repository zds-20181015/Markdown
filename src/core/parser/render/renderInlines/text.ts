// render token of text type to vdom.
export default function text(
  this: any,
  h: any,
  cursor: any,
  block: any,
  token: any
) {
  const { start, end } = token.range
  return [h('span.ag-plain-text', this.highlight(h, block, start, end, token))]
}
