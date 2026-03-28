<template>
  <div class="toast" :class="type">
    <p v-if="title" class="toast__title">
      {{ title }}
    </p>
    <p v-if="message" class="toast__message">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  title: String,
  message: String,
  type: String as PropType<'success' | 'warning' | 'error'>,
})
</script>

<style lang="scss">
.toast {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 20px 40px 20px 30px;
  background-color: var(--white);
  border-radius: 15px;
  color: var(--dark);

  &__title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  &.error {
    border-left: var(--error) 10px solid;
  }

  &.success {
    border-left: var(--success) 10px solid;
  }

  &.warning {
    border-left: var(--warning) 10px solid;
  }
}
</style>
