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
          <span class="label-text">File</span>
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
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const service_name = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

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
      console.error("Error uploading file:", error);
      errorMessage.value = `Файл не загружен: ${error}`;
      successMessage.value = "";
      isLoading.value = false;
    }
  );
};
</script>

<style></style>
