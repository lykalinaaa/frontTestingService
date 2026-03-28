<template>
  <div class="new-blog">
    <div class="new-blog-container">
      <p class="new-blog__title">Создайте новый блог!</p>
      <div class="new-blog__form">
        <div class="new-blog__field">
          <label class="new-blog__label">Название блога</label>
          <input
            v-model="newBlog.blogName"
            type="text"
            class="new-blog__input new-blog__input--username"
            placeholder="Введите название"
          />
        </div>
      </div>
      <div class="new-blog__submit">
        <Button type="blue round" @click="cancelBlog()" title="Отменить" />
        <Button type="orange round" @click="createBlog()" title="Создать" />
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

const emit = defineEmits(['cancel', 'createBlog'])

const newBlog = ref({
  blogName: '',
})

const cancelBlog = () => {
  emit('cancel')
}

const createBlog = () => {
  if (newBlog.value.blogName) {
    emit('createBlog', newBlog.value.blogName)
  } else {
    toastVal.isShown = true
    setTimeout(() => {
      toastVal.isShown = false
    }, 5000)
  }
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
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: 5px;
  }

  &__input {
    border-color: var(--blue);
    margin-top: 5px;

    &::placeholder {
      color: var(--primary);
    }

    &--disabled {
      opacity: 0.5;
    }
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
