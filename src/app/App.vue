<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import router from '@/app/providers/router'

onMounted(() => {
  router.push('/auth')
})
</script>
