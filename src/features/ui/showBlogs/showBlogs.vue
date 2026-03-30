<template>
  <div class="new-blog">
    <div class="new-blog-container">
      <p class="new-blog__title">Блоги:</p>
      <div class="new-blog__form">
        <div v-for="blog in blogs" :key="blog.id" class="new-blog__item">
          <Button :title="blog.blogName" type="blue round" @click="openBlog(blog.id)"/>
        </div>
      </div>
      <div class="new-blog__submit">
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

const emit = defineEmits(['cancel', 'openBlog'])

const props = defineProps({
  blogs: Array
})

const openBlog = (id: number) => {
  emit('openBlog', id)
}

const cancelBlogs = () => {
  emit('cancel')
}

const toastVal = reactive({
  isShown: false,
  title: 'Не получилось создать блог',
  message: 'Введите название блога.',
  type: 'error',
})
</script>

<style lang="scss" scoped>
.new-blog {
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
    overflow: auto;
    max-height: 600px;
  }

  &__item {
    height: 50px;
    width: 100%;
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
