import { computed, defineComponent, FunctionalComponent, h, Ref } from 'vue'
import styles from './SideBar.module.scss'

import { ElIcons } from '../ElementPlus'

import SideBarTOCTree from './SideBarTOCTree.vue'
import SideBarFiles from './SideBarFiles.vue'
import SideBarSearch from './SideBarSearch.vue'
import { Component, ref } from 'vue'
import { toggleDark } from '@/components/ElementPlus'
interface Tab {
  [key: string]: { component: Component; icon: Component }
}

const tabs: Tab = {
  files: { component: SideBarFiles, icon: ElIcons.Files },
  toc: { component: SideBarTOCTree, icon: ElIcons.Document },
  search: { component: SideBarSearch, icon: ElIcons.Search }
}

export default defineComponent({
  setup() {
    const currentTab: Ref<string | number> = ref<keyof Tab>('toc')
    const Icon: FunctionalComponent<{ name: keyof Tab }> = ({ name }) => {
      return (
        <div
          class={styles.icon}
          onClick={() => {
            currentTab.value = name
          }}
        >
          {h(tabs[name].icon)}
        </div>
      )
    }

    const tabShow = ref(true)
    const tabStyle = computed(() => {
      const tabState = () => (tabShow.value ? styles.open : styles.close)
      return styles.tab + ' ' + tabState()
    })
    const changeTabShow = () => {
      tabShow.value = !tabShow.value
    }
    return () => (
      <div>
        <div class={styles.root}>
          <div class={styles['icon-bar']}>
            <Icon name="files" />
            <Icon name="toc" />
            <Icon name="search" />
            <div
              class={styles.icon}
              onClick={() => {
                toggleDark()
              }}
            >
              <ElIcons.Sunny />
            </div>
            <div
              class={`${styles.icon} ${styles.expand}`}
              onClick={changeTabShow}
            >
              <ElIcons.Expand />
            </div>
          </div>
          <div class={tabStyle.value} ref="tab">
            {h(tabs[currentTab.value].component)}
          </div>
        </div>
      </div>
    )
  }
})
