<template>
  <div class="new-post">
    <div class="new-post-container">
      <p class="new-post__title">Создайте новый пост!</p>
      <div class="new-post__form">
        <div class="new-post__field">
          <label class="new-post__label">Название поста</label>
          <input
            v-model="newPost.title"
            type="text"
            class="new-post__input new-post__input--username"
            placeholder="Введите название"
          />
          <label class="new-post__label">Текст поста</label>
          <textarea id="post" name="post" rows="6" v-model="newPost.fullDescription" class="new-post__text"/>
        </div>
      </div>
      <div class="new-post__submit">
        <Button type="blue round" @click="cancelPost()" title="Отменить" />
        <Button type="orange round" @click="createPost()" title="Создать" />
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
import {reactive, ref, toRaw} from 'vue'
import Toast from '@/shared/ui/Toast/Toast.vue'
import {useBlogStore} from "@/app/providers/stores/blogStore.ts";

const props = defineProps({
  postInfo: {
    type: Object,
  }
})

const emit = defineEmits(['cancel', 'createPost', 'editPost'])
const blogStore = useBlogStore()

const newPost = ref({
  title: props.postInfo?.title || '',
  fullDescription: props.postInfo?.fullDescription || '',
  briefDescription: props.postInfo?.briefDescription || '',
  id: props.postInfo?.id || null,
  createdAt: '',
  comments: ''
})

const cancelPost = () => {
  emit('cancel')
}

const createPost = async () => {
  if (newPost.value.title.trim() && newPost.value.fullDescription.trim()) {
    newPost.value.createdAt = new Date()
    newPost.value.briefDescription = newPost.value.fullDescription.slice(0, 100)
    if (newPost.value.fullDescription.length > 100) newPost.value.briefDescription += '...'
    const rawPost = toRaw(newPost.value)
    emit('createPost', rawPost)
    await blogStore.setBlogs()
  } else {
    toastVal.isShown = true
    setTimeout(() => {
      toastVal.isShown = false
    }, 5000)
  }
}

const toastVal = reactive({
  isShown: false,
  title: 'Не получилось создать пост',
  message: 'Заполните все поля',
  type: 'error',
})
</script>

<style lang="scss" scoped>
.new-post {
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
    margin: 5px 0 30px 0;

    &::placeholder {
      color: var(--primary);
    }

    &--disabled {
      opacity: 0.5;
    }
  }

  &__text {
    border: none;
    margin-top: 10px;
    border-radius: 20px;
    padding: 20px;
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
