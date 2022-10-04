import { defineComponent } from 'vue'
import styles from './EditorHeader.module.scss'

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <h4>Header</h4>
      </div>
    )
  }
})
