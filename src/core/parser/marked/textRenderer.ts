/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
  TextRenderer.prototype.em =
  TextRenderer.prototype.codespan =
  TextRenderer.prototype.del =
  TextRenderer.prototype.text =
    function (text: any) {
      return text
    }

TextRenderer.prototype.html = function (html: any) {
  return html
}

TextRenderer.prototype.inlineMath = function (math: any, displayMode: any) {
  return math
}

TextRenderer.prototype.emoji = function (text: any, emoji: any) {
  return emoji
}

TextRenderer.prototype.script = function (content: any, marker: string) {
  const tagName = marker === '^' ? 'sup' : 'sub'
  return `<${tagName}>${content}</${tagName}>`
}

TextRenderer.prototype.footnoteIdentifier = function (
  identifier: any,
  { footnoteId, footnoteIdentifierId, order }: any
) {
  return `<a href="#${
    footnoteId ? `fn${footnoteId}` : ''
  }" class="footnote-ref" id="fnref${footnoteIdentifierId}" role="doc-noteref"><sup>${
    order || identifier
  }</sup></a>`
}

TextRenderer.prototype.link = TextRenderer.prototype.image = function (
  href: any,
  title: any,
  text: string
) {
  return '' + text
}

TextRenderer.prototype.br = function () {
  return ''
}

export default TextRenderer
