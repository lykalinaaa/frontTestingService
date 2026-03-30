<template>
  <div class="home-page">
    <Menu v-if="showMenu" @create-blog="onNewBlogPopup" @show-blogs="onShowBlogsPopup"/>
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
    <div v-else class="home-page__container">
      <div class="home-page__container-content">

      </div>
    </div>
    <new-blog v-if="newBlogPopup" @cancel="cancelBlog" @create-blog="onCreateBlog" />
    <show-blogs v-if="showBlogsPopup" @cancel="cancelBlogs" :blogs="blogStore.blogs" @open-blog="openBlog"/>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import { createBlog, getPosts } from '@/features/api'
import { useBlogStore } from '@/app/providers/stores/blogStore.ts'
import NewBlog from '@/features/ui/newBlog/newBlog.vue'
import router from '@/app/providers/router'
import Menu from '@/shared/ui/Menu/Menu.vue'
import { useRoute } from 'vue-router'
import ShowBlogs from "@/features/ui/showBlogs/showBlogs.vue";

const route = useRoute()

const blogStore = useBlogStore()
const newBlogPopup = ref<boolean>(false)
const showBlogsPopup = ref<boolean>(false)

const onNewBlogPopup = () => {
  newBlogPopup.value = true
}

const onShowBlogsPopup = () => {
  showBlogsPopup.value = true
}

const cancelBlogs = () => {
  showBlogsPopup.value = false
}

const openBlog = (id: number) => {
  if (id) {
    router.push(`/blog/${id}`)
  }
}

const showMenu = computed(() => {
  return route.path !== '/auth'
})

const menuList = reactive([
  {
    title: 'Главная',
    path: '/',
    isSelected: true,
    type: 'blue',
  },
  {
    title: 'Создать блог',
    path: '/blog',
    isSelected: false,
    type: 'orange round',
  },
])

const cancelBlog = () => {
  newBlogPopup.value = false
}

const onCreateBlog = async (blogName: string) => {
  const blog = await createBlog({ blogName: blogName, fullName: blogName })

  blogStore.setBlogs(await getPosts())
  router.push({
    name: 'blog',
    params: { id: blog.id },
  })

  newBlogPopup.value = false
}

onMounted(async () => {
  blogStore.setBlogs(await getPosts())
})
</script>

<style lang="scss">
.home-page {
  background-color: var(--primary);
  width: 100%;
  height: 100%;

  &__container {
    max-width: 800px;

    &--empty {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__container-info {
    background-color: var(--white);
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
</style>
