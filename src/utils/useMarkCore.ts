import MarkCore from '@/core'

/**
 * 确保markcore只有一个实例,输入container创建新实例，否则返回旧实例
 */
let mark: MarkCore | undefined
export function useMarkCore(container?: HTMLDivElement): MarkCore | undefined {
  if (container) {
    mark = new MarkCore(container, {})
    mark.init()
  } else if (mark === undefined) {
    throw Error('未初始化')
  }
  return mark
}
