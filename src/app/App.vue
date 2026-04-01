<template>
  <router-view />
  <Menu v-if="showMenu" @create-blog="onNewBlogPopup" @show-blogs="onShowBlogsPopup" :show-blogs-button="blogStore.blogs.length > 0"/>
  <new-blog v-if="newBlogPopup" @cancel="cancelBlog" @create-blog="onCreateBlog" />
  <show-blogs v-if="showBlogsPopup" @cancel="cancelBlogs" :blogs="blogStore.blogs" @open-blog="openBlog" @delete-blog="onDeleteBlog" :show-toast="showToast"/>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Menu from "@/shared/ui/Menu/Menu.vue";
import NewBlog from "@/features/ui/newBlog/newBlog.vue";
import ShowBlogs from "@/features/ui/showBlogs/showBlogs.vue";
import {createBlog, deleteBlog} from "@/features/api";
import {useBlogStore} from "@/app/providers/stores/blogStore.ts";

const router = useRouter()
const route = useRoute()

const newBlogPopup = ref<boolean>(false)
const showBlogsPopup = ref<boolean>(false)
const blogStore = useBlogStore()
const showToast = ref<boolean>(false)

onMounted(() => {
  router.push('/auth')
})

const showMenu = computed(() => {
  return route.path !== '/auth'
})

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
    showBlogsPopup.value = false
    router.push(`/blog/${id}`)
  }
}

const onDeleteBlog = async (id: number) => {
  if (id) {
    try {
      await deleteBlog(id)
      await blogStore.setBlogs()
      if (blogStore.blogs.length === 0 || route.path === `/blog/${id}`) {
        cancelBlogs()
        router.replace('/')
      }
    } catch (err) {
      showToast.value = true
    }
  }
}

const cancelBlog = () => {
  newBlogPopup.value = false
}

const onCreateBlog = async (blogName: string) => {
  const blog = await createBlog({ blogName: blogName, fullName: blogName })

  blogStore.setBlogs()
  router.push({
    name: 'blog',
    params: { id: blog.id },
  })

  newBlogPopup.value = false
}
</script>
