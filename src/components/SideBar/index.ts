// import SideBar from './SideBar'

// export default SideBar
export interface TOCTree {
  label: string
  children?: TOCTree
}

export interface TOC {
  text: string
  lvl: number
  children?: TOC[]
}

/**
 * 比较深度
 */
const isDeeper = (c: TOC, p: TOC) => c.lvl > p.lvl
const toLabel = (c: TOC) => ({ label: /\w.*/.exec(c.text), ...c })
/**
 * 将扁平的TOC数组转化成树状的TOC数组
 */
export const toTOCTree = (flat: TOC[]): TOC[] => {
  if (flat.length <= 1) return flat
  let start = flat[0]
  const res: any[] = []
  for (let i = 1; i < flat.length; i++) {
    const now = flat[i]
    if (isDeeper(now, start)) {
      if (!start.children) {
        start.children = []
      }
      start.children?.push(toLabel(now))
    } else {
      res.push(toLabel(start))
      start = now
    }
    if (i === flat.length - 1) {
      res.push(toLabel(start))
    }
  }

  res.forEach((toc) => {
    toc.children && toc.children.length > 1
      ? (toc.children = toTOCTree(toc.children))
      : {
          /**no do */
        }
  })
  return res
}

export function stateToTOCTree(state: any[]) {
  const header = (state: any) => {
    const res: any = []
    for (const v of state) {
      if (v.name === 'atx-heading' || v.name === 'setext-heading') {
        res.push({
          text: v.text,
          lvl: v.meta.level
        })
      }
    }
    return res
  }
  const headers = header(state)
  const tree = toTOCTree(headers)
  return tree
}
