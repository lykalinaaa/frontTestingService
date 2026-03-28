<template>
  <Auth v-if="!isUserAuth" @check-auth="checkAuth" :form-disable="formDisable" />
  <Toast
    v-if="toastVal.isShown"
    :title="toastVal.title"
    :message="toastVal.message"
    :type="toastVal.type"
  />
</template>

<script setup lang="ts">
import Auth from '@/features/ui/auth/Auth.vue'
import router from '@/app/providers/router'
import { onMounted, reactive, ref } from 'vue'
import { getAuthToken } from '@/features/api'
import Toast from '@/shared/ui/Toast/Toast.vue'

const isUserAuth = ref<boolean>(false)
const formDisable = ref<boolean>(false)
const toastVal = reactive({
  isShown: false,
  title: '',
  message: '',
  type: 'error',
})

function checkAuth(payload: { userLogin: string; userPassword: string }): void {
  formDisable.value = true
  getAuthToken({
    login: payload.userLogin,
    password: payload.userPassword,
  }).then((result) => {
    if (result.ok) {
      isUserAuth.value = true
      router.push('/')
      toastVal.isShown = false
    } else {
      toastVal.isShown = true
      toastVal.title = 'Ошибка авторизации.'
      toastVal.message = 'Пользователь не найден. Повторите попытку.'
      setTimeout(() => {
        toastVal.isShown = false
        toastVal.title = ''
        toastVal.message = ''
        toastVal.type = 'error'
      }, 5000)
    }
    formDisable.value = false
  })
}

onMounted(() => {
  if (!isUserAuth.value) router.push('/auth')
})
</script>
