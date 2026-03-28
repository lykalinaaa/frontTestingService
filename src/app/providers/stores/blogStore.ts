import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blogStore', () => {
  const blogs = ref([])

  const setBlogs = (newBlogs: any[]) => {
    blogs.value = newBlogs
  }

  return { blogs, setBlogs }
})
