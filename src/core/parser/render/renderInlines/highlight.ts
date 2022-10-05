import { union } from '../../../utils'

// change text to highlight vdom
export default function highlight(
  this: any,
  h: any,
  block: any,
  rStart: any,
  rEnd: any,
  token: any
) {
  const { text } = block
  const { highlights } = token
  let result: any = []
  const unions: any[] = []
  let pos = rStart

  if (highlights) {
    for (const light of highlights) {
      const un: any = union({ start: rStart, end: rEnd }, light)
      if (un) unions.push(un)
    }
  }

  if (unions.length) {
    for (const u of unions) {
      const { start, end, active } = u
      const className = this.getHighlightClassName(active)

      if (pos < start) {
        result.push(text.substring(pos, start))
      }

      result.push(h(`span.${className}`, text.substring(start, end)))
      pos = end
    }
    if (pos < rEnd) {
      result.push(block.text.substring(pos, rEnd))
    }
  } else {
    result = [text.substring(rStart, rEnd)]
  }

  return result
}
