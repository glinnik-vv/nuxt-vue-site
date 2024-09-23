<template>
  <div>
    <button class="btn btn-primary" @click="fetchPatients(page)">Refresh</button>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="patientsFilterId" placeholder="Filter..." />
      <UInput v-model="patientsFilterFirstName" placeholder="Filter..." />
      <UInput v-model="patientsFilterLastName" placeholder="Filter..." />
      <button class="btn btn-primary" @click="filteredPatients">Refresh</button>
    </div>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="countPatients"
        @update:modelValue="fetchPatients(page)"
      />
    </div>
    <UTable
      :rows="Patients"
      :loading="isLoading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      @select="select"
    >
      <template #quantity-data="{ row }">
        {{ row.age.value }}
      </template>
    </UTable>

    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="countPatients"
        @update:modelValue="fetchPatients(page)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
const page = ref(1);
const Patients = ref<Patient[]>([]);
const countPatients = ref(0);
const nextPatients = ref<string | null>("");
const previousPatients = ref<string | null>("");
const patientsFilterId = ref("");
const patientsFilterFirstName = ref("");
const patientsFilterLastName = ref("");

const pageCount = 25;

const limit = ref(25);
const offset = ref(0);
const isLoading = ref(true);

const select = (patient: Patient) => {
  navigateTo(`/patients/${patient.id}`);
};

const fetchPatients = async (page: number = 1) => {
  isLoading.value = true;
  offset.value = limit.value * (page - 1);
  await fetchData(
    "GET",
    "patients",
    {
      page: page,
      limit: limit.value,
      offset: offset.value,
    },
    null,
    (data) => {
      countPatients.value = data.count;
      Patients.value = data.results;
      nextPatients.value = data.next;
      previousPatients.value = data.previous;
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

const filteredPatients = async () => {
  isLoading.value = true;
  const params = {
    id_pac: patientsFilterId.value,
    first_name: patientsFilterFirstName?.value,
    last_name: patientsFilterLastName?.value,
  };
  await fetchData(
    "GET",
    "patients",
    params,
    null,
    (data) => {
      Patients.value = data.results;
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
  fetchPatients(1);
});
</script>

<style></style>
