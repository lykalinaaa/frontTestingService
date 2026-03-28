<template>
  <div class="auth">
    <div class="auth-container">
      <p class="auth__title">Войдите в профиль</p>
      <div class="auth__form">
        <div class="auth__field">
          <label class="auth__label">Логин</label>
          <input
            v-model="userAuth.userLogin"
            type="text"
            class="auth__input auth__input--username"
            :class="{ 'auth__input--disabled': formDisable }"
            placeholder="Введите логин"
            :disabled="formDisable"
          />
        </div>

        <div class="auth__field">
          <label class="auth__label">Пароль</label>
          <input
            v-model="userAuth.userPassword"
            type="password"
            class="auth__input auth__input--password"
            :class="{ 'auth__input--disabled': formDisable }"
            placeholder="Введите пароль"
            :disabled="formDisable"
          />
        </div>
      </div>
      <div class="auth__submit">
        <button class="auth__button" @click="getAuth()">Войти</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['checkAuth'])

const props = defineProps({
  formDisable: Boolean,
})

const userAuth = reactive({
  userLogin: 'Kurchatov',
  userPassword: 'Igor',
})

function getAuth() {
  emit('checkAuth', userAuth)
}
</script>

<style lang="scss" scoped>
.auth {
  background-color: var(--primary);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);

  @include max-width($breakpoint-768) {
    padding: 0 15px;
  }

  &-container {
    background-color: var(--dark-blue);
    box-shadow: 0 4px 4px 0 rgba(30, 25, 25, 0.25);
    border-radius: 30px;
    max-width: 600px;
    width: 100%;
    padding: 40px 50px;

    @include max-width($breakpoint-768) {
      padding: 40px 30px;
    }
  }

  &__title {
    font-size: 30px;
    text-align: center;

    @include max-width($breakpoint-768) {
      font-size: 24px;
    }
  }

  &__form {
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: 5px;
  }

  &__input {
    border-color: var(--blue);
    margin-top: 5px;

    &::placeholder {
      color: var(--primary);
    }

    &--disabled {
      opacity: 0.5;
    }
  }

  &__button {
    background-color: var(--orange);
    max-width: 150px;
  }

  &__submit {
    text-align: center;
  }
}
</style>
