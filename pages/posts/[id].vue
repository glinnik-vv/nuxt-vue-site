<template>
  <div>
    <div class="bg-white rounded-lg shadow p-8">
      <h1 class="text-xl font-bold mb-4">Редактирование поста</h1>
      <div v-if="successMessage" class="bg-success">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-error">
        {{ errorMessage }}
      </div>
      <form
        @submit.prevent="id === 'create' ? createPost() : updatePost()"
        class="space-y-4"
      >
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Заголовок:</label
          >
          <input
            type="text"
            v-model="post.title"
            id="title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700"
            >Содержание:</label
          >
          <textarea
            v-model="post.text"
            id="content"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Категория:</label
          >
          <select
            v-model="post.category"
            id="category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Сохранить
        </button>
        <button
          type="button"
          @click="showModal = true"
          class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Удалить
        </button>
      </form>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 z-10">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white rounded-lg shadow p-8">
          <h1 class="text-xl font-bold mb-4">Подтверждение удаления</h1>
          <p class="text-sm text-gray-700 mb-4">
            Вы действительно хотите удалить этот пост?
          </p>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Отмена
            </button>
            <button
              type="button"
              @click="deletePost"
              class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const post = ref({ title: "", text: "", user: 1, category: 1 });
const id = route.params.id;
const showModal = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const categories = ref<Category[]>([]);

const fetchCategories = async () => {
  await fetchData(
    "GET",
    "categories",
    null,
    null,
    (data) => {
      categories.value = data.results;
    },
    (error) => {
      console.error("Error fetching categories:", error);
    }
  );
};

const fetchPost = async () => {
  if (id === "create") {
    return;
  }
  await fetchData(
    "GET",
    `posts/${id}`,
    null,
    null,
    (postData) => {
      const postsValue = postData as Post;
      if (postsValue) {
        post.value.title = postsValue.title;
        post.value.text = postsValue.text;
        post.value.user = postsValue.user;
        post.value.category = postsValue.category;
      }
    },
    (error) => {
      console.error(`Error fetching post with id ${id}:`, error);
    }
  );
};

const createPost = async () => {
  await fetchData(
    "POST",
    "posts",
    null,
    post.value,
    (data) => {
      successMessage.value = "Пост создан";
      errorMessage.value = "";
      navigateTo(`/posts/${data.id}`);
    },
    (error) => {
      console.error("Error creating post:", error);
      errorMessage.value = `Пост не создан: ${error}`;
      successMessage.value = "";
    }
  );
};

const updatePost = async () => {
  await fetchData(
    "PUT",
    `posts/${id}`,
    null,
    post.value,
    (data) => {
      successMessage.value = "Пост обновлен";
      errorMessage.value = "";
      navigateTo("/posts/" + data.id);
    },
    (error) => {
      errorMessage.value = `Пост не обновлен: ${error}`;
      successMessage.value = "";
    }
  );
};

const deletePost = async () => {
  await fetchData(
    "DELETE",
    `posts/${id}`,
    null,
    null,
    (data) => {
      successMessage.value = "Пост удален";
      errorMessage.value = "";
      navigateTo("/posts/");
    },
    (error) => {
      errorMessage.value = `Ошибка при удалении поста: ${error}`;
      console.error(error);
    }
  );
};

onMounted(() => {
  fetchPost();
  fetchCategories();
});
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
