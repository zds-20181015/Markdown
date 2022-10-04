<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Editor from './components/Editor/Editor'
import SideBar from './components/SideBar/SideBar'
import EditorFooter from './components/Editor/EditorFooter'
</script>

<template>
  <div class="main">
    <SideBar />
    <Editor />
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
