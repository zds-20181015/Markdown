import { defineStore } from 'pinia'

import { reactive, ref } from 'vue'

import { toTOCTree, TOCTree, TOC } from '@/components/SideBar'
export const useTOCStore = defineStore('toc', () => {
  const toc = reactive<any[]>([])
  function setTOC(tocs: TOC[]) {
    // const a = toTOCTree(tocs)
    Object.assign(toc, tocs)
  }
  return {
    toc,
    setTOC
  }
})
