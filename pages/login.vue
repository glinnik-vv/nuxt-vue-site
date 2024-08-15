<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Авторизация</h1>
      <form @submit.prevent="fetchAndUpdateAuth">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Имя пользователя:</label
          >
          <input
            type="text"
            v-model="username"
            id="username"
            class="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Пароль:</label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            class="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const access_token = useCookie("access_token");
const refresh_token = useCookie("refresh_token");

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const fetchAndUpdateAuth = async () => {
  const { data: auth_token } = await useFetch(
    runtimeConfig.public.API_URL + "/api/token/",
    {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
      onResponseError: ({ response }) => {
        if (response.status === 401) {
          errorMessage.value = "Неправильное имя пользователя или пароль";
        }
      },
    }
  );
  const authTokenValue = auth_token.value as AuthToken;
  if (authTokenValue) {
    access_token.value = authTokenValue.access;
    refresh_token.value = authTokenValue.refresh;
    navigateTo("/");
  }
};

definePageMeta({
  layout: false,
});
</script>

<style></style>
