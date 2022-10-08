import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import styles from './EditorFooter.module.scss'
export default defineComponent({
  setup() {
    return () => <el-footer class={styles.root}></el-footer>
  }
})
