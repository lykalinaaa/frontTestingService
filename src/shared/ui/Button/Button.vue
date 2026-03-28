<template>
  <div class="button" :class="type" @click="handleClick">
    <p class="button_title">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  title: String,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) emit('click')
}
</script>
<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
  max-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orange:active {
  background-color: var(--dark-orange);
}

.orange {
  background-color: var(--orange);
  color: var(--primary);
}

.blue {
  background-color: var(--dark-blue);
  color: var(--primary);
}

.blue:active {
  background-color: var(--blue);
}

.round {
  border-radius: 12px;
  text-align: center;
}
</style>
