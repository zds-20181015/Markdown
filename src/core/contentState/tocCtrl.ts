const tocCtrl = (ContentState: any) => {
  ContentState.prototype.getTOC = function () {
    const { blocks } = this
    const toc: any = []

    for (const block of blocks) {
      if (/^h\d$/.test(block.type)) {
        const { headingStyle, key, type } = block
        const { text } = block.children[0]
        const content =
          headingStyle === 'setext'
            ? text.trim()
            : text.replace(/^\s*#{1,6}\s{1,}/, '').trim()
        const lvl = +type.substring(1)
        const slug = key
        toc.push({
          content,
          lvl,
          slug
        })
      }
    }

    return toc
  }
}

export default tocCtrl
