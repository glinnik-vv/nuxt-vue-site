<template>
  <div>
    <h1 class="m-4">Posts</h1>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <span class="loading loading-dots loading-md"></span>
    </div>
    <div v-else>
      <p class="ml-4">Всего постов: {{ countPosts }}</p>
      <p class="ml-4">Текущая страница: {{ currentPage }}</p>
      <UInputMenu
        v-model="limit"
        :options="limit_variants"
        @update:modelValue="fetchPosts(currentPage)"
        class="m-4"
      />
      <div class="text-right m-4">
        <button class="btn btn-primary m-4" @click="fetchPosts(currentPage)">
          Обновить
        </button>
        <NuxtLink to="/posts/create">
          <button class="btn btn-primary">Добавить пост</button>
        </NuxtLink>
      </div>
      <UPagination
        v-model="currentPage"
        :page-count="limit"
        :total="countPosts"
        @update:modelValue="fetchPosts(currentPage)"
        class="ml-4"
      />
      <div
        v-for="post in resultsPosts"
        :key="post.id"
        class="m-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-300"
      >
        <div class="text-2xl font-bold mb-2">{{ post.title }}</div>
        <div class="text-lg mb-2">{{ post.text }}</div>
        <div class="text-sm text-gray-500 mb-2">
          Создано: {{ new Date(post.created_at).toLocaleString() }}
        </div>
        <div class="text-sm text-gray-500">
          Обновлено: {{ new Date(post.updated_at).toLocaleString() }}
        </div>
        <div class="mt-2">
          <NuxtLink :to="`/posts/${post.id}`">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Перейти на страницу
            </button>
          </NuxtLink>
        </div>
      </div>
      <UPagination
        v-model="currentPage"
        :page-count="limit"
        :total="countPosts"
        @update:modelValue="fetchPosts(currentPage)"
        class="ml-4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const limit_variants = ["10", "25", "50", "100"];
const countPosts = ref(0);
const resultsPosts = ref<Post[]>([]);
const nextPosts = ref<string | null>("");
const previousPosts = ref<string | null>("");
const isLoading = ref(true);

const currentPage = ref(1);
const limit = ref(25);
const offset = ref(0);

const fetchPosts = async (page: number = 1) => {
  currentPage.value = page;
  offset.value = limit.value * (page - 1);
  await fetchData(
    "GET",
    "posts",
    {
      page: page,
      limit: limit.value,
      offset: offset.value,
    },
    null,
    (data) => {
      countPosts.value = data.count;
      resultsPosts.value = data.results;
      nextPosts.value = data.next;
      previousPosts.value = data.previous;
      isLoading.value = false;
    },
    (error) => {
      console.error("Error fetching posts:", error);
      if (error.status === 401) {
        navigateTo("/login");
      }
    }
  );
};

onMounted(() => {
  fetchPosts();
});
</script>

<style></style>
