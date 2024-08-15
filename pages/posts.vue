<template>
  <div>
    <h1>Posts</h1>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const { auth, refresh } = await useFetch(runtimeConfig.public.API_URL + "/api/token", {
  method: "POST",
  body: {
    username: "admin",
    password: "admin",
  },
  onResponseError: () => {
    console.log("onResponseError");
  },
});
// const { data, refresh, error } = await useFetch(runtimeConfig.public.API_URL + "/posts", {
//   headers: {
//     Authorization: "Bearer " + auth.data.value?.access,
//   },
//   onResponseError: () => {
//     console.log("onResponseError");
//   },
// });
</script>

<style></style>
