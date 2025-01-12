<template>
  <q-table
    :columns
    :loading
    :rows
    :title
    bordered
    flat
    separator="cell"
    :selection="selection.type"
    v-model:selected="selected"
  >
    <template v-if="$slots.top" #top>
      <slot name="top"> </slot>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ColumnsTable } from '../../../interfaces/componentsProps';
import { InterfaceAxios } from '../../../interfaces/InterfaceAxios';
import { onMounted, Reactive, reactive, ref, watch } from 'vue';
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
  selection: {
    type: Object as () => {
      type: 'none' | 'single' | 'multiple' | undefined;
    },
    required: false,
    default: { type: 'none' },
  },
});

const emit = defineEmits(['getSelected']);
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
const selected = ref([]);

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

watch(
  () => selected,
  (newValue) => {
    emit(
      'getSelected',
      newValue.value.map((val: Record<string, unknown>) => val.id)
    );
  },
  { deep: true }
);
</script>
