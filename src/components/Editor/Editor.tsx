import { defineComponent } from 'vue'
import styles from './Editor.module.scss'

import EditorHeader from './EditorHeader'
import EditorFooter from './EditorFooter'
import _EditorTest from './_EditorTest'
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <EditorHeader />
        <div class={styles.editor}>
          <div class={styles.input}>
            <_EditorTest />
          </div>
        </div>
        <EditorFooter />
      </div>
    )
  }
})
