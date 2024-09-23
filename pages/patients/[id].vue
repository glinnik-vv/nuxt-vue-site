<template>
  <div>
    <UForm ref="form" :state="patient" @submit="updatePost" :disabled="!enableEdit">
      <UFormGroup
        v-for="(value, key) in patient"
        :key="key.toString()"
        :label="key.toString()"
      >
        <UInput :disabled="!enableEdit" :value="value" v-model="patient[key]" />
      </UFormGroup>

      <!-- <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" :disabled="!enableEdit" />
      </UFormGroup> -->

      <UButton v-if="enableEdit" type="submit"> Сохранить </UButton>
      <UButton v-if="enableEdit" @click="enableEdit = false"> Отмена </UButton>

      <UButton
        v-if="enableEdit === false"
        @click="enableEdit = true"
        :disabled="enableEdit"
      >
        Редактировать
      </UButton>
      <UButton
        v-if="enableEdit === false"
        @click="deletePost"
        :disabled="enableEdit"
        сlass="bg-red-500"
      >
        Удалить
      </UButton>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
const form = ref();

const route = useRoute();
const patient = ref({
  first_name: "",
  last_name: "",
  surname: "",
  birth_date: "",
  id_pac: "",
  sex: "",
  snils: "",
  created_at: "",
  updated_at: "",
});
const id = route.params.id;
const showModal = ref(false);
const enableEdit = ref(false);
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
    `patients/${id}`,
    null,
    null,
    (postData) => {
      const postsValue = postData as Patient;
      if (postsValue) {
        patient.value.first_name = postsValue.first_name;
        patient.value.last_name = postsValue.last_name;
        patient.value.surname = postsValue.surname;
        patient.value.birth_date = postsValue.birth_date;
        patient.value.id_pac = postsValue.id_pac;
        patient.value.sex = postsValue.sex;
        patient.value.snils = postsValue.snils;
        patient.value.created_at = postsValue.created_at;
        patient.value.updated_at = postsValue.updated_at;
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
    "patients",
    null,
    patient.value,
    (data) => {
      successMessage.value = "Пост создан";
      errorMessage.value = "";
      navigateTo(`/patients/${data.id}`);
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
    `patients/${id}`,
    null,
    patient.value,
    (data) => {
      successMessage.value = "Пост обновлен";
      errorMessage.value = "";
      navigateTo("/patients/" + data.id);
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
    `patients/${id}`,
    null,
    null,
    (data) => {
      successMessage.value = "Пост удален";
      errorMessage.value = "";
      navigateTo("/patients/");
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

<style></style>
