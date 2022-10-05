import { CLASS_OR_ID } from '../../../config'
import escapeCharactersMap from '../../escapeCharacter'

export default function htmlEscape(
  this: any,
  h: any,
  cursor: any,
  block: any,
  token: any,
  outerClass: any
) {
  const className = this.getClassName(outerClass, block, token, cursor)
  const { escapeCharacter } = token
  const { start, end } = token.range

  const content = this.highlight(h, block, start, end, token)

  return [
    h(
      `span.${className}.${CLASS_OR_ID.AG_HTML_ESCAPE}`,
      {
        dataset: {
          character: escapeCharactersMap[escapeCharacter]
        }
      },
      content
    )
  ]
}
