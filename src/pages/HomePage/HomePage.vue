<template>
  <div v-if="isLoading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="home-page">
    <div v-if="!blogStore.blogs.length" class="home-page__container--empty">
      <div class="home-page__container-info">
        <p class="home-page__container-info-text">Пока нет блогов.</p>
        <div class="home-page__container-info--add">
          <Button
            :title="!blogStore.blogs.length ? 'Создать блог' : 'Создать пост'"
            type="orange round"
            @click="onNewBlogPopup"
          />
        </div>
      </div>
    </div>
    <div v-else-if="!allPostsWithAuthors.length" class="home-page__container--empty">
      <div class="home-page__container-info">
        <p class="home-page__container-info-text">Ни в одном блоге пока нет постов!</p>
        <p>Перейдите во "Все блоги" и добавьте пост.</p>
      </div>
    </div>
    <div v-else class="home-page__container">
      <div class="home-page__container-content">
        <div v-for="post in allPostsWithAuthors" class="blog-page-posts-item">
          <p class="blog-page-posts-item__blog" @click="openBlog(post.blogId)">
            {{post.blogName}}
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
  <new-blog v-if="newBlogPopup" @cancel="cancelBlog" @create-blog="onCreateBlog" />
</template>

<script setup lang="ts">
import {computed, onMounted, ref, toRaw} from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import { createBlog } from '@/features/api'
import { useBlogStore } from '@/app/providers/stores/blogStore.ts'
import NewBlog from '@/features/ui/newBlog/newBlog.vue'
import router from '@/app/providers/router'

const blogStore = useBlogStore()
const newBlogPopup = ref<boolean>(false)

const isLoading = ref<boolean>(true)

const cancelBlog = () => {
  newBlogPopup.value = false
}

const allPostsWithAuthors = computed(() => {
  if (!blogStore.blogs?.length) return []

  const posts = blogStore.blogs.flatMap(blog => {
    if (!blog.post?.length) return []

    return blog.post.map(post => ({
      ...post,
      blogId: blog.id,
      blogName: blog.blogName
    }))
  })

  return posts.sort((a, b) => {
    const dateA = new Date(a.dateTime)
    const dateB = new Date(b.dateTime)
    return dateB.getTime() - dateA.getTime()
  })
})

const onCreateBlog = async (blogName: string) => {
  const blog = await createBlog({ blogName: blogName, fullName: blogName })

  blogStore.setBlogs()
  router.push({
    name: 'blog',
    params: { id: blog.id },
  })

  newBlogPopup.value = false
}

const openBlog = (id) => {
  router.push({
    name: 'blog',
    params: { id: id },
  })
}

const onNewBlogPopup = () => {
  newBlogPopup.value = true
}

onMounted(async () => {
  await blogStore.setBlogs()
  isLoading.value = false
})
</script>

<style lang="scss">
.home-page {
  background-color: var(--primary);
  width: 100%;
  padding-top: 150px;
  display: flex;
  justify-content: center;

  &__container {
    max-width: 800px;
    flex: 1;
    min-height: calc(100vh - 150px);

    &--empty {
      width: 100%;
      height: calc(100vh - 150px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__container-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__container-info {
    background-color: var(--white);
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    max-width: 500px;
    width: 100%;
    padding: 40px 50px;
    border-radius: 30px;
    box-shadow: 0 4px 4px 0 rgba(30, 25, 25, 0.25);

    &-text {
      font-size: 30px;
      margin-bottom: 30px;
    }

    &--add {
      height: 50px;
      display: flex;
      justify-content: center;
    }
  }
}

.blog-page-posts-item__blog {
  text-align: end;

  &:hover {
    color: var(--orange);
  }
}
</style>
