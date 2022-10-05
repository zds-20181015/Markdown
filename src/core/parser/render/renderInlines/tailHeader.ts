export default function tailHeader(
  this: any,
  h: any,
  cursor: any,
  block: any,
  token: any,
  outerClass: any
) {
  const className = this.getClassName(outerClass, block, token, cursor)
  const { start, end } = token.range
  const content = this.highlight(h, block, start, end, token)
  if (/^h\d$/.test(block.type)) {
    return [h(`span.${className}`, content)]
  } else {
    return content
  }
}
