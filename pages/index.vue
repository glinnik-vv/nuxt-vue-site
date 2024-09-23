<template>
  <div>
    <form action="" @submit.prevent="uploadFile">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Service name</span>
        </label>
        <input
          v-model="service_name"
          type="text"
          placeholder="Service name"
          class="input input-bordered"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Файл</span>
        </label>
        <input
          type="file"
          ref="fileInput"
          class="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary">Upload</button>
      </div>
    </form>
    <div v-if="isLoading" class="loading loading-dots loading-md"></div>

    <div v-if="errorMessage" class="alert alert-error shadow-lg mt-4" role="alert">
      <div>
        <span>{{ errorMessage }}</span>
      </div>
    </div>

    <div v-if="successMessage" class="alert alert-success shadow-lg mt-4" role="alert">
      <div>
        <span>{{ successMessage }}</span>
      </div>
    </div>
    <button class="btn btn-primary mt-4" @click="fetchPatients(currentPage)">
      Refresh
    </button>
    <div>
      <UTable :rows="rows" />

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination v-model="currentPage" :page-count="limit" :total="countPosts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const service_name = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const currentPage = ref(1);
const countPosts = ref<number>(0);
const limit = ref(25);
const offset = ref(0);
const patients = ref<Patient[]>([]);

const rows = computed(() => {
  return patients.value.slice(
    (currentPage.value - 1) * countPosts.value,
    currentPage.value * countPosts.value
  );
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const uploadFile = async () => {
  isLoading.value = true;
  const file = fileInput.value?.files?.[0];
  if (!file) {
    errorMessage.value = "Файл не выбран";
    successMessage.value = "";
    isLoading.value = false;
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("service_name", service_name.value);
  await fetchData(
    "POST",
    "upload",
    null,
    formData,
    (data) => {
      successMessage.value = "Файл успешно загружен";
      errorMessage.value = "";
      isLoading.value = false;
    },
    (error) => {
      console.error("Error uploading file:", error.response);
      errorMessage.value = `Файл не загружен: ${error.response}`;
      successMessage.value = "";
      isLoading.value = false;
    }
  );
};

const fetchPatients = async (page: number = 1) => {
  currentPage.value = page;
  offset.value = limit.value * (page - 1);
  await fetchData(
    "GET",
    "patients",
    {
      page: page,
    },
    null,
    (data) => {
      countPosts.value = data.count;
      patients.value = data.results;
      isLoading.value = false;
    },
    (error) => {
      console.error("Error fetching patients:", error);
    }
  );
};
</script>

<style></style>
