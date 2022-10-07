import { defineComponent, ref, onMounted } from 'vue'
import styles from './Editor.module.scss'

import _EditorTest from './_EditorTest'

import MarkCore from '@/core'
import { ElButton } from 'element-plus'

import { useTOCStore } from '@/store'

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
      <div class={styles.root}>
        <div class={styles.editor}>
          <div class={styles.input} ref={editor}></div>
        </div>
      </div>
    )
  }
})
