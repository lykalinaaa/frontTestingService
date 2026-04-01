<template>
  <div class="blogs">
    <div class="blogs-container">
      <p class="blogs__title">Блоги:</p>
      <div class="blogs__form">
        <div v-for="blog in blogs" :key="blog.id" class="blogs__item">
          <p class="blogs__item-title" @click="openBlog(blog.id)">{{blog.blogName}}</p>
          <Button title="Удалить" type="blue-orange round" @click="deleteBlog(blog.id)"/>
        </div>
      </div>
      <div class="blogs__submit">
        <Button type="orange round" @click="cancelBlogs()" title="Отменить" />
      </div>
    </div>
  </div>
  <Toast
    v-if="toastVal.isShown"
    :title="toastVal.title"
    :message="toastVal.message"
    :type="toastVal.type"
  />
</template>

<script setup lang="ts">
import Button from '@/shared/ui/Button/Button.vue'
import { reactive, ref } from 'vue'
import Toast from '@/shared/ui/Toast/Toast.vue'

const emit = defineEmits(['cancel', 'openBlog', 'deleteBlog'])

const props = defineProps({
  blogs: Array,
  showToast: Boolean
})

const openBlog = (id: number) => {
  emit('openBlog', id)
}

const deleteBlog = (id: number) => {
  emit('deleteBlog', id)
}
const cancelBlogs = () => {
  emit('cancel')
}

const toastVal = reactive({
  isShown: false,
  title: 'Не получилось удвлить блог',
  message: 'Попробуйте еще раз.',
  type: 'error',
})
</script>

<style lang="scss" scoped>
.blogs {
  background-color: rgba(black, 0.8);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;

  @include max-width($breakpoint-768) {
    padding: 0 15px;
  }

  &-container {
    background-color: var(--dark-blue);
    border-radius: 30px;
    max-width: 600px;
    width: 100%;
    padding: 40px 50px;

    @include max-width($breakpoint-768) {
      padding: 40px 30px;
    }
  }

  &__title {
    font-size: 30px;
    text-align: center;

    @include max-width($breakpoint-768) {
      font-size: 24px;
    }
  }

  &__form {
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: auto;
    max-height: 600px;
    padding-right: 8px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--blue);
      border-radius: 3px;

      &:hover {
        background-color: var(--orange);
      }
    }

  }

  &__item {
    height: 50px;
    width: 100%;
    display: flex;
    border-radius: 12px;
    align-items: center;
    padding-left: 12px;
    justify-content: space-between;
    flex-shrink: 0;

    &:hover {
      background-color: var(--blue);
      cursor: pointer;
    }

    &-title {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__label {
    margin-bottom: 5px;
  }

  &__submit {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
