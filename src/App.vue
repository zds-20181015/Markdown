<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Editor from './components/Editor/Editor'
import SideBar from './components/SideBar/SideBar'
import EditorHeader from './components/Editor/EditorHeader'
import EditorFooter from './components/Editor/EditorFooter'
import { ElContainer, ElAside, ElMain, ElHeader, ElFooter } from 'element-plus'
import { computed } from 'vue'
import { useSideBarStore } from '@/store'
const sideBarStore = useSideBarStore()
const asideWidth = computed(() => {
  return sideBarStore.tabShow ? '15rem' : '4rem'
})
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside :width="asideWidth"><SideBar /></el-aside>
      <el-container>
        <el-header><EditorHeader /></el-header>
        <el-main class="editor"><Editor /> </el-main>
        <el-footer><EditorFooter /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
