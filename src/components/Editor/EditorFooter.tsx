import { defineComponent } from 'vue'
import styles from './EditorFooter.module.scss'
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <h4>Footer</h4>
      </div>
    )
  }
})
