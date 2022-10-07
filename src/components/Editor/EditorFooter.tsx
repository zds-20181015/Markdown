import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import styles from './EditorFooter.module.scss'
export default defineComponent({
  setup() {
    return () => (
      <div class={styles.root}>
        <ElButton class="button">更换主题</ElButton>
      </div>
    )
  }
})
