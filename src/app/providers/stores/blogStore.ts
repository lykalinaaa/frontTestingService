import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getPosts} from "@/features/api";

export const useBlogStore = defineStore('blogStore', () => {
  const blogs = ref([])

  const setBlogs = async () => {
    blogs.value = await getPosts()
  }

  return { blogs, setBlogs }
})
