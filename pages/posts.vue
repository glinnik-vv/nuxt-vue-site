<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in resultsPosts" :key="post.id">
      <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
const runtimeConfig = useRuntimeConfig();

const access_token = useCookie("access_token");

const countPosts = ref(0);
const resultsPosts = ref<Post[]>([]);
const nextPosts = ref("");
const previousPosts = ref("");

const fetchPosts = async () => {
  const posts = await $fetch<PaginatedResponse>(
    runtimeConfig.public.API_URL + "/api/posts/",
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`.trim(),
      },
      onResponseError: ({ response }) => {
        console.log("onResponseError", response.status);
      },
    }
  );
  const postsValue = posts as PaginatedResponse;
  if (posts) {
    countPosts.value = postsValue.count;
    resultsPosts.value = postsValue.results;
    nextPosts.value = postsValue.next ?? "";
    previousPosts.value = postsValue.previous ?? "";
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style></style>
