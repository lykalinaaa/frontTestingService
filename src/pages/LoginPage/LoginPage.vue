<template>
  <div class="login-page">
    <div class="login-page-container">
      <p class="login-page__title">
        Войдите в профиль
      </p>
      <div class="login-page__form">
        <div class="login-page__field">
          <label class="login-page__label">Логин</label>
          <input
            v-model="userAuth.userLogin"
            type="text"
            class="login-page__input login-page__input--username"
            placeholder="Введите логин"
          >
        </div>

        <div class="login-page__field">
          <label class="login-page__label">Пароль</label>
          <input
            v-model="userAuth.userPassword"
            type="password"
            class="login-page__input login-page__input--password"
            placeholder="Введите пароль"
          >
        </div>
      </div>
      <div class="login-page__submit">
        <button
          class="login-page__button"
          @click="getAuth()"
        >
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {getAuthToken} from "@/features/api/index.js";

const userAuth = reactive({
  userLogin: 'Kurchatov',
  userPassword: 'Igor'
})

function getAuth() {
  getAuthToken({
    login: userAuth.userLogin,
    password: userAuth.userPassword
  }).then(result => {
    console.log(result)
  })
}

</script>

<style lang="scss" scoped>
.login-page {
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
}

.login-page-container {
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

.login-page__title {
  font-size: 30px;
  text-align: center;

  @include max-width($breakpoint-768) {
    font-size: 24px;
  }
}

.login-page__form {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-page__field {
  display: flex;
  flex-direction: column;
}

.login-page__label {
  margin-bottom: 5px;
}

.login-page__input{
  border-color: var(--blue);
  margin-top: 5px;
}

.login-page__input::placeholder {
  color: var(--primary);
}

.login-page__submit {
  margin: auto;
  width: 150px;
}

.login-page__button {
  background-color: var(--orange);
}
</style>
