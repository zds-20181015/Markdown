import runSanitize from './dompurify'
import { URL_REG, DATA_URL_REG, IMAGE_EXT_REG } from '../config'
export { getUniqueId, getLongUniqueId } from './random'

const TIMEOUT = 1500

const HTML_TAG_REPLACEMENTS: any = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

export const isMetaKey = ({ key }: any) =>
  key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta'

export const noop = () => {}

export const identity = (i: any) => i

export const isOdd = (number: number) => Math.abs(number) % 2 === 1

export const isEven = (number: number) => Math.abs(number) % 2 === 0

export const isLengthEven = (str = '') => str.length % 2 === 0

export const snakeToCamel = (name: string) =>
  name.replace(/_([a-z])/g, (p0, p1) => p1.toUpperCase())

export const camelToSnake = (name: string) =>
  name.replace(/([A-Z])/g, (_, p) => `-${p.toLowerCase()}`)

/**
 *  Are two arrays have intersection
 */
export const conflict = (arr1: any[], arr2: any[]) => {
  return !(arr1[1] < arr2[0] || arr2[1] < arr1[0])
}

interface unionType {
  start: number
  end: number
  active?: boolean
}
export const union = (
  { start: tStart, end: tEnd }: unionType,
  { start: lStart, end: lEnd, active }: unionType
) => {
  if (!(tEnd <= lStart || lEnd <= tStart)) {
    if (lStart < tStart) {
      return {
        start: tStart,
        end: tEnd < lEnd ? tEnd : lEnd,
        active
      }
    } else {
      return {
        start: lStart,
        end: tEnd < lEnd ? tEnd : lEnd,
        active
      }
    }
  }
  return null
}

// https://github.com/jashkenas/underscore
export const throttle = (func: any, wait = 50) => {
  let context: any
  let args: any
  let result: any
  let timeout: any = null
  let previous = 0
  const later = () => {
    previous = Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  return function (this: any) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
// simple implementation...
export const debounce = (func: any, wait = 50) => {
  let timer: any = null
  return function (...args: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const deepCopyArray: any = (array: any) => {
  const result: any = []
  const len = array.length
  let i
  for (i = 0; i < len; i++) {
    if (typeof array[i] === 'object' && array[i] !== null) {
      if (Array.isArray(array[i])) {
        result.push(deepCopyArray(array[i]))
      } else {
        result.push(deepCopy(array[i]))
      }
    } else {
      result.push(array[i])
    }
  }
  return result
}

// TODO: @jocs rewrite deepCopy
export const deepCopy = (object: any) => {
  const obj: any = {}
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      if (Array.isArray(object[key])) {
        obj[key] = deepCopyArray(object[key])
      } else {
        obj[key] = deepCopy(object[key])
      }
    } else {
      obj[key] = object[key]
    }
  })
  return obj
}

export const loadImage = async (url: string, detectContentType = false) => {
  if (detectContentType) {
    const isImage = await checkImageContentType(url)
    if (!isImage) throw new Error('not an image')
  }
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve({
        url,
        width: image.width,
        height: image.height
      })
    }
    image.onerror = (err) => {
      reject(err)
    }
    image.src = url
  })
}

export const isOnline = () => {
  return navigator.onLine === true
}

export const getPageTitle = (url: any) => {
  // No need to request the title when it's not url.
  if (!url.startsWith('http')) {
    return ''
  }
  // No need to request the title when off line.
  if (!isOnline()) {
    return ''
  }

  const req = new XMLHttpRequest()
  let settle: any
  const promise = new Promise((resolve, reject) => {
    settle = resolve
  })
  const handler = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        const contentType: any = req.getResponseHeader('Content-Type')
        if (/text\/html/.test(contentType)) {
          const { response } = req
          if (typeof response === 'string') {
            const match = response.match(/<title>(.*)<\/title>/)
            return match && match[1] ? settle(match[1]) : settle('')
          }
          return settle('')
        }
        return settle('')
      } else {
        return settle('')
      }
    }
  }
  const handleError = (e: any) => {
    settle('')
  }
  req.open('GET', url)
  req.onreadystatechange = handler
  req.onerror = handleError
  req.send()

  // Resolve empty string when `TIMEOUT` passed.
  const timer = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('')
    }, TIMEOUT)
  })

  return Promise.race([promise, timer])
}

export const checkImageContentType = (url: any) => {
  const req = new XMLHttpRequest()
  let settle: any
  const promise = new Promise((resolve, reject) => {
    settle = resolve
  })
  const handler = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        const contentType: any = req.getResponseHeader('Content-Type')
        if (/^image\/(?:jpeg|png|gif|svg\+xml|webp)$/.test(contentType)) {
          settle(true)
        } else {
          settle(false)
        }
      } else if (req.status === 405) {
        // status 405 means method not allowed, and just return true.(Solve issue#1297)
        settle(true)
      } else {
        settle(false)
      }
    }
  }
  const handleError = () => {
    settle(false)
  }
  req.open('HEAD', url)
  req.onreadystatechange = handler
  req.onerror = handleError
  req.send()

  return promise
}

/**
 * Return image information and correct the relative image path if needed.
 *
 * @param {string} src Image url
 * @param {string} baseUrl Base path; used on desktop to fix the relative image path.
 */
export const getImageInfo = (src: any, baseUrl: any = window.__dirname) => {
  const imageExtension = IMAGE_EXT_REG.test(src)
  const isUrl =
    URL_REG.test(src) || (imageExtension && /^file:\/\/.+/.test(src))

  // Treat an URL with valid extension as image.
  if (imageExtension) {
    // NOTE: Check both "C:\" and "C:/" because we're using "file:///C:/".
    const isAbsoluteLocal = /^(?:\/|\\\\|[a-zA-Z]:\\|[a-zA-Z]:\/).+/.test(src)

    if (isUrl || (!isAbsoluteLocal && !baseUrl)) {
      if (!isUrl && !baseUrl) {
        console.warn('"baseUrl" is not defined!')
      }

      return {
        isUnknownType: false,
        src
      }
    } else {
      // Correct relative path on desktop. If we resolve a absolute path "path.resolve" doesn't do anything.
      // NOTE: We don't need to convert Windows styled path to UNIX style because Chromium handels this internal.
      return {
        isUnknownType: false,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        src: 'file://' + require('path').resolve(baseUrl, src)
      }
    }
  } else if (isUrl && !imageExtension) {
    // Assume it's a valid image and make a http request later
    return {
      isUnknownType: true,
      src
    }
  }

  // Data url
  if (DATA_URL_REG.test(src)) {
    return {
      isUnknownType: false,
      src
    }
  }

  // Url type is unknown
  return {
    isUnknownType: false,
    src: ''
  }
}

export const escapeHTML = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  )

export const unescapeHTML = (str: string) =>
  str.replace(
    /(?:&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (tag) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  )

export const escapeInBlockHtml = (html: string) => {
  return html.replace(
    /(<(style|script|title)[^<>]*>)([\s\S]*?)(<\/\2>)/g,
    (m, p1, p2, p3, p4) => {
      return `${escapeHTML(p1)}${p3}${escapeHTML(p4)}`
    }
  )
}

export const escapeHtmlTags = (html: string) => {
  return html.replace(/[&<>"']/g, (x) => {
    return HTML_TAG_REPLACEMENTS[x]
  })
}

export const wordCount = (markdown: any) => {
  const paragraph = markdown.split(/\n{2,}/).filter((line: any) => line).length
  let word = 0
  let character = 0
  let all = 0

  const removedChinese = markdown.replace(/[\u4e00-\u9fa5]/g, '')
  const tokens = removedChinese.split(/[\s\n]+/).filter((t: any) => t)
  const chineseWordLength = markdown.length - removedChinese.length
  word += chineseWordLength + tokens.length
  character +=
    tokens.reduce((acc: any, t: any) => acc + t.length, 0) + chineseWordLength
  all += markdown.length

  return { word, paragraph, character, all }
}

// mixins
export const mixins = (constructor: any, ...object: any[]) => {
  return Object.assign(constructor.prototype, ...object)
}

export const sanitize = (
  html: string,
  purifyOptions: any,
  disableHtml: any
) => {
  if (disableHtml) {
    return runSanitize(escapeHtmlTags(html), purifyOptions)
  } else {
    return runSanitize(escapeInBlockHtml(html), purifyOptions)
  }
}

export const getParagraphReference = (ele: any, id: any) => {
  const { x, y, left, top, bottom, height } = ele.getBoundingClientRect()
  return {
    getBoundingClientRect() {
      return { x, y, left, top, bottom, height, width: 0, right: left }
    },
    clientWidth: 0,
    clientHeight: height,
    id
  }
}

export const verticalPositionInRect = (event: any, rect: any) => {
  const { clientY } = event
  const { top, height } = rect
  return clientY - top > height / 2 ? 'down' : 'up'
}

export const collectFootnotes = (blocks: any) => {
  const map = new Map()
  for (const block of blocks) {
    if (block.type === 'figure' && block.functionType === 'footnote') {
      const identifier = block.children[0].text
      map.set(identifier, block)
    }
  }

  return map
}

export const getDefer = () => {
  const defer: any = {}
  const promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  defer.promise = promise

  return defer
}

/**
 * Deep clone the given object.
 *
 * @param {*} obj Object to clone
 */
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}
