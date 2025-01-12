<template>
  <TableApi
    :endpoint
    title="CRUD"
    :selection="{ type: 'multiple' }"
    @getSelected="getSelected"
  >
    <template #top>
      <q-space />
      <div class="q-gutter-md">
        <ScaleTransitionComponent>
          <q-btn
            v-if="idsSelected.length"
            label="Eliminar registros"
            color="negative"
          />
        </ScaleTransitionComponent>
        <q-btn label="Crear registro" color="primary" />
      </div>
    </template>
  </TableApi>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import TableApi from './Tables/TableApi.vue';
import ScaleTransitionComponent from './Transitions/ScaleTransitionComponent.vue';

defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const idsSelected: Ref<number[]> = ref([]);

const getSelected = (idsSelectedEmit: number[]) => {
  idsSelected.value = idsSelectedEmit;
};
</script>
