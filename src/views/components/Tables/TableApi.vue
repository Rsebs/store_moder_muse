<template>
  <q-table :columns :loading :rows :title bordered flat separator="cell" />
</template>

<script setup lang="ts">
import { ColumnsTable } from '../../../interfaces/componentsProps';
import { InterfaceAxios } from '../../../interfaces/InterfaceAxios';
import { onMounted, Reactive, reactive, ref } from 'vue';
import AxiosService from '../../../services/axiosService';

const { endpoint } = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
});

onMounted(() => {
  fetchData();
});

const data: InterfaceAxios = reactive({
  data: [{}],
  message: '',
  paginate: [],
});
const columns: ColumnsTable[] = reactive([]);
let rows: Reactive<Record<string, unknown>[]> = reactive([]);
const loading = ref(false);

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await AxiosService.get(endpoint);
    Object.assign(data, response);
    const formattedData = Array.isArray(data.data) ? data.data : [data.data];
    formatTable(formattedData);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const formatTable = (dataTable: Record<string, unknown>[]) => {
  const headersTable = Object.keys(dataTable[0]);
  headersTable.forEach((header) => {
    columns.push({
      name: header,
      required: true,
      label: header,
      align: 'left',
      field: (row) => row[header],
      format: (val) => `${val}`,
      sortable: true,
    });
  });
  rows = dataTable;
};
</script>
