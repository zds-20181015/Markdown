import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import styles from './Editor.module.scss'

import _EditorTest from './_EditorTest'

import Muya from '@/lib'

import { useTOCStore, useThemeStore } from '@/store'

import { useMuya } from '@/utils/useMarkCore'

import { stateToTOCTree } from '../SideBar'

export default defineComponent({
  setup() {
    const inputRef = ref<HTMLDivElement | undefined>(undefined)
    const tocStore = useTOCStore()
    const setToc = (muya: Muya) => {
      const state = muya.editor.jsonState.getState()
      const tocTree = stateToTOCTree(state)
      tocStore.setTOC(tocTree)
    }
    onMounted(() => {
      if (inputRef.value) {
        const muya = useMuya(inputRef.value)
        setToc(muya)
        muya.domNode.oninput = () => {
          setToc(muya)
        }
      }
    })

    const themeStore = useThemeStore()
    const theme = computed(() => {
      return themeStore.theme
    })
    /**
     * 换色，会影响highlight
     */
    watchEffect(() => {
      const c = document.querySelectorAll(`.${styles.input} .mu-container *`)
      if (themeStore.theme === 'dark') {
        c.forEach((v: any) => {
          v.style.color = '#eee'
        })
      } else {
        c.forEach((v: any) => {
          v.style.color = '#111'
        })
      }
    })
    return () => (
      <div class={styles.root}>
        <div class={styles.editor}>
          <div class={styles.input} ref={inputRef}></div>
        </div>
      </div>
    )
  }
})
