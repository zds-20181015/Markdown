import { CLASS_OR_ID } from '../../../config'

export default function hr(
  this: any,
  h: any,
  cursor: any,
  block: any,
  token: any,
  outerClass: any
) {
  const { start, end } = token.range
  const content = this.highlight(h, block, start, end, token)
  return [h(`span.${CLASS_OR_ID.AG_GRAY}.${CLASS_OR_ID.AG_REMOVE}`, content)]
}
