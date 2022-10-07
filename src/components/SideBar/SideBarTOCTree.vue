<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTOCStore } from '@/store'
import { useThemeStore } from '@/store'
interface TOCTree {
  label: string
  children?: TOCTree[]
}

const defaultToc: TOCTree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const props = defineProps<{
  toc: TOCTree[]
}>()

const tocStore = useTOCStore()
const themeStore = useThemeStore()
const treeClassName = computed(() => {
  return themeStore.theme
})
</script>
<template>
  <el-tree :data="tocStore.toc" :props="defaultProps" :class="treeClassName" />
</template>

<style scoped lang="scss">
.light {
  background-color: white;
}
.dark {
  background-color: black;
}
</style>
