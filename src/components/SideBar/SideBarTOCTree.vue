<script setup lang="ts">
import { ref } from 'vue'
import { ElTree } from 'element-plus'

interface TOCTree {
  label: string
  children?: TOCTree[]
}
const handleNodeClick = (data: TOCTree) => {
  console.log(data)
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
</script>
<template>
  <div>
    <ElTree :data="defaultToc" :props="defaultProps" />
  </div>
</template>

<style scoped></style>
