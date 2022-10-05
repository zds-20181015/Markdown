/* eslint-disable @typescript-eslint/ban-ts-comment */
import Renderer from './renderer'
import Lexer from './lexer'
import Parser from './parser'
import options from './options'

/**
 * Marked
 */

function marked(src: any, opt: any = {}) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null')
  }
  if (typeof src !== 'string') {
    throw new Error(
      'marked(): input parameter is of type ' +
        Object.prototype.toString.call(src) +
        ', string expected'
    )
  }

  try {
    opt = Object.assign({}, options, opt)
    return new (Parser as any)(opt).parse(new (Lexer as any)(opt).lex(src))
  } catch (e: any) {
    e.message +=
      '\nPlease report this to https://github.com/marktext/marktext/issues.'
    if (opt.silent) {
      return (
        '<p>An error occurred:</p><pre>' +
        //@ts-ignore
        escape(e.message + '', true) +
        '</pre>'
      )
    }
    throw e
  }
}

export { Renderer, Lexer, Parser }

export default marked
