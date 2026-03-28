<template>
  <div class="blog-page">
    <div class="blog-page-container">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/app/providers/stores/blogStore.ts'

const route = useRoute()
const blogStore = useBlogStore()

const blogInfo = ref<string | null>(null)

onMounted(() => {
  blogInfo.value = blogStore.blogs.find((el) => el.id == route.params.id)
})
</script>
<style>
.blog-page {
  background-color: var(--primary);
}
</style>
