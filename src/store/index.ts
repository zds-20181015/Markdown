import { defineStore } from 'pinia'

import { reactive, ref } from 'vue'

import { TOC } from '@/components/SideBar'
export const useTOCStore = defineStore('toc', () => {
  const toc = reactive<any[]>([])
  function setTOC(tocs: TOC[]) {
    Object.assign(toc, tocs)
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

export const useSideBarStore = defineStore('sidebar', () => {
  const tabShow = ref<boolean>(true)
  const changeTabShow = () => {
    tabShow.value = !tabShow.value
  }
  return {
    tabShow,
    changeTabShow
  }
})

export const useMarkdownStore = defineStore('markdown', () => {
  const markdown = ref<string>('this is markdown')
  return { markdown }
})
