// import SideBar from './SideBar'
// export default SideBar
export interface TOCTree {
  label: string
  children?: TOCTree
}

export interface TOC {
  content: string
  lvl: number
  slug?: string
  children?: TOC[]
}

/**
 * 比较深度
 */
const isDeeper = (c: TOC, p: TOC) => c.lvl > p.lvl
const toLabel = (c: TOC) => ({ label: c.content, ...c })
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
