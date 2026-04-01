<template>
  <div class="blog-page">
    <div class="blog-page-container">
      <div class="blog-page-header">
        <h1 v-if="blogInfo">{{blogInfo.blogName}}</h1>
        <div class="home-page__container-info--add">
          <Button
            v-if="blogInfo?.post.length > 0"
            title="Добавить пост"
            type="orange round"
            @click="onNewPostPopup"
          />
        </div>
      </div>
      <div class="blog-page-posts">
        <div v-if="!blogInfo?.post?.length" class="blog-page-posts--empty">
          <div class="home-page__container-info">
            <p class="home-page__container-info-text">Пока нет постов.</p>
            <div class="home-page__container-info--add">
              <Button
                title="Добавить пост"
                type="orange round"
                @click="onNewPostPopup"
              />
            </div>
          </div>
        </div>
        <div v-else v-for="post in sortedPosts" class="blog-page-posts-item">
          <p class="blog-page-posts-item__controls">
            <span class="blog-page-posts-item__header" @click="onEditPost(toRaw(post))">Редактировать</span>
            <span class="blog-page-posts-item__header" @click="onDeletePost(post.id)">Удалить</span>
          </p>
          <h2>{{post.title}}</h2>
          <p>{{post.briefDescription}}</p>
          <p class="blog-page-posts-item__footer">
            <span>
              {{post.dateTime}}
            </span>
            <span>
              Комментарии: {{post.comments.length}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <new-post v-if="newPost" @cancel="cancelPost" @create-post="onCreatePost" :post-info="postInfo"/>
  <Toast
    v-if="toastVal.isShown"
    :title="toastVal.title"
    :message="toastVal.message"
    :type="toastVal.type"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {computed, onMounted, reactive, ref, toRaw, watch} from 'vue'
import { useBlogStore } from '@/app/providers/stores/blogStore.ts'
import Button from "@/shared/ui/Button/Button.vue";
import NewPost from '@/features/ui/newPost/newPost.vue'
import {createPost, deletePost, editPost} from "@/features/api";
import Toast from "@/shared/ui/Toast/Toast.vue";

const route = useRoute()
const blogStore = useBlogStore()

const blogInfo = ref(null)
const newPost = ref<boolean>(false)
const postInfo = ref({
  briefDescription: '',
  fullDescription: '',
  id: null,
  title: ''
})

const sortedPosts = computed(() => {
  if (!blogInfo.value?.post) return []

  return [...blogInfo.value.post].sort((a, b) => {
    const dateA = new Date(a.dateTime)
    const dateB = new Date(b.dateTime)

    return dateB.getTime() - dateA.getTime()
  })
})

const updateBlogInfo = () => {
  blogInfo.value = blogStore.blogs.find((el) => el.id === +route.params.id)
}

const postList = computed(() => {
  return blogInfo.value?.post || null
})

const onNewPostPopup = () => {
  newPost.value = true
}

const cancelPost = () => {
  newPost.value = false
  postInfo.value = {
    briefDescription: '',
    fullDescription: '',
    id: null,
    title: ''
  }
}

const onDeletePost = async (id: number) => {
  if (id) {
    try {
      await deletePost(id)
      await blogStore.setBlogs()
      updateBlogInfo()
    } catch (err) {
      toastVal.isShown = true
    }
  }
}

const onEditPost = async (post) => {
  if (post.title) {
    newPost.value = true
    postInfo.value = {
      briefDescription: post.briefDescription,
      fullDescription: post.fullDescription,
      id: route.params.id,
      title: post.title
    }
  }
}


const onCreatePost = async (post) => {
  if (post.id) {
    try {
      await editPost(post)
      await blogStore.setBlogs()
      updateBlogInfo()
      newPost.value = false
    } catch (err) {
      toastVal.isShown = true
    }
  }
  else {
    if (post.title && post.fullDescription) {
      try {
        await createPost(post, route.params.id)
        await blogStore.setBlogs()
        updateBlogInfo()
        newPost.value = false
      } catch (err) {
        toastVal.isShown = true
      }
    }
  }
  postInfo.value = {
    briefDescription: '',
    fullDescription: '',
    id: null,
    title: ''
  }
}

const toastVal = reactive({
  isShown: false,
  title: 'Не получилось создать пост',
  message: 'Повторите попытку.',
  type: 'error',
})

onMounted(() => {
  updateBlogInfo()
})

watch(() => route.params.id, () => {
  updateBlogInfo()
})

</script>
<style>
.blog-page {
  background-color: var(--primary);
  padding-top: 120px;
  display: flex;
  justify-content: center;
  height: auto;
  padding-bottom: 200px;
}

.blog-page-posts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.blog-page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}

.blog-page-container {
  max-width: 800px;
  flex: 1;
  height: calc(100vh - 120px);
}

.blog-page-posts--empty {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.blog-page-posts-item {
  background-color: var(--white);
  border-radius: 16px;
  padding: 16px;

  &:hover {
    box-shadow: 0 4px 4px 0 rgba(30, 25, 25, 0.25);
    cursor: pointer;
  }
}

h1 {
  margin: 0;
}

h2 {
  margin-top: 0;
}

.blog-page-posts-item__header {
  font-size: 12px;
  opacity: 0.6;
  display: inline-block;

  &:hover {
    color: var(--orange);
    cursor: pointer;
  }
}

.blog-page-posts-item__controls {
  justify-content: end;
  display: flex;
  gap: 10px;
}

.home-page__container-info--add {
  height: 50px;
  display: flex;
  justify-content: center;
  width: 150px;
}

.blog-page-posts-item__footer {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  font-size: 12px;
  opacity: 0.6;
}
</style>
