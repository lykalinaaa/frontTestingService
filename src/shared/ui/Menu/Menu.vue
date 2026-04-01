<template>
  <div class="menu">
    <div class="menu__list">
      <Button title="Создать блог" type="orange round" @click="createBlog" />
      <Button v-if="showBlogsButton" title="Все блоги" type="blue round" @click="showBlogs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/shared/ui/Button/Button.vue'

const props = defineProps({
  showBlogsButton: Boolean
})

const emit = defineEmits(['createBlog', 'showBlogs'])

const createBlog = () => {
  emit('createBlog')
}

const showBlogs = () => {
  emit('showBlogs')
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  background-color: var(--dark-blue);
  z-index: 10;
  box-shadow: 0 4px 4px 0 rgba(30, 25, 25, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  padding-top: 15px;
  padding-right: 15px;
}

.menu__list {
  display: flex;
  height: 50px;
  justify-content: end;
  gap: 8px;
}

.menu__list-item {
  width: 150px;
}
</style>
