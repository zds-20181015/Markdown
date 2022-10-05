import { filter } from 'fuzzaldrin'
import emojis from './emojisJson.json'
import { CLASS_OR_ID } from '../../config'

const emojisForSearch: any = {}

for (const emoji of emojis) {
  const newEmoji = Object.assign({}, emoji, {
    search: [...emoji.aliases, ...emoji.tags].join(' ')
  })
  if (emojisForSearch[newEmoji.category]) {
    emojisForSearch[newEmoji.category].push(newEmoji)
  } else {
    emojisForSearch[newEmoji.category] = [newEmoji]
  }
}

/**
 * check if one emoji code is in emojis, return undefined or found emoji
 */
export const validEmoji = (text: string) => {
  return emojis.find((emoji) => {
    return emoji.aliases.includes(text)
  })
}

/**
 * check edit emoji
 */

export const checkEditEmoji = (node: any) => {
  if (node && node.classList.contains(CLASS_OR_ID.AG_EMOJI_MARKED_TEXT)) {
    return node
  }
  return false
}

class Emoji {
  cache: any
  constructor() {
    this.cache = new Map()
  }

  search(text: any) {
    const { cache } = this
    if (cache.has(text)) return cache.get(text)
    const result: any = {}

    Object.keys(emojisForSearch).forEach((category) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const list = filter(emojisForSearch[category], text, { key: 'search' })
      if (list.length) {
        result[category] = list
      }
    })
    cache.set(text, result)
    return result
  }

  destroy() {
    return this.cache.clear()
  }
}

export default Emoji
