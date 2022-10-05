import { defineComponent, ref, onMounted } from 'vue'
import styles from './Editor.module.scss'

import EditorHeader from './EditorHeader'
import EditorFooter from './EditorFooter'
import _EditorTest from './_EditorTest'

import MarkCore from '@/core'

export default defineComponent({
  setup() {
    const editor = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      console.log(editor.value)

      const mark = new MarkCore(editor?.value, {})
      mark.init()
    })
    return () => (
      <div class={styles.root}>
        <EditorHeader />
        <div class={styles.editor}>
          <div class={styles.input} ref={editor}></div>
        </div>
        <EditorFooter />
      </div>
    )
  }
})
