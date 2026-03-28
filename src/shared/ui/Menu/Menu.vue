<template>
  <div class="menu">
    <div class="menu__list">
      <div class="menu__list-item">
        <Button title="Создать блог" type="orange round" @click="createBlog" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/shared/ui/Button/Button.vue'

const emit = defineEmits(['createBlog'])

const createBlog = () => {
  emit('createBlog')
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
}

.menu__list-item {
  width: 150px;
}
</style>
