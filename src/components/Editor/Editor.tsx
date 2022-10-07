import { defineComponent, ref, onMounted, computed } from 'vue'
import styles from './Editor.module.scss'

import EditorHeader from './EditorHeader'
import EditorFooter from './EditorFooter'
import _EditorTest from './_EditorTest'

import { useTOCStore, useThemeStore } from '@/store'

import { useMarkCore } from '@/utils/useMarkCore'

export default defineComponent({
  setup() {
    const editor = ref<HTMLDivElement | undefined>(undefined)
    const tocStore = useTOCStore()
    onMounted(() => {
      console.log(editor.value)
      const mark = useMarkCore(editor?.value)
      /**
       * 注册事件，当输入时响应
       */
      mark?.eventCenter.subscribe('input-toc', (toc: any) => {
        tocStore.setTOC(toc)
      })
    })

    return () => (
      <el-container class={styles.root}>
        <EditorHeader />
        <div class={styles.editor}>
          <div class={styles.input} ref={editor}></div>
        </div>
        <EditorFooter />
      </el-container>
    )
  }
})
