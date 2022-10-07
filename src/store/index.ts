import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { toTOCTree, TOCTree, TOC } from '@/components/SideBar'
export const useTOCStore = defineStore('toc', () => {
  const toc = reactive<any[]>([])
  function setTOC(tocs: TOC[]) {
    const a = toTOCTree(tocs)
    Object.assign(toc, a)
  }
  return {
    toc,
    setTOC
  }
})

export const useThemeStore = defineStore('color', () => {
  const theme = ref<'light' | 'dark'>('light')
  const changeTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  return {
    theme,
    changeTheme
  }
})
