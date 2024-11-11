<template>
  <q-input
    v-model="model"
    :color
    :dark
    :label
    :label-color="labelColor"
    :outlined
    :rounded
    :type
  >
    <template v-if="iconAppend" v-slot:append>
      <q-icon :name="iconAppend" color="grey-4" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { InputTypes } from '../../../interfaces/componentsProps';

const model = defineModel({
  type: String,
  required: true,
});

defineProps({
  color: {
    type: String,
    required: false,
  },
  dark: {
    type: Boolean,
    default: false,
    required: false,
  },
  iconAppend: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  labelColor: {
    type: String,
    required: false,
  },
  outlined: {
    type: Boolean,
    default: false,
    required: false,
  },
  rounded: {
    type: Boolean,
    default: false,
    required: false,
  },
  type: {
    type: String as () => InputTypes,
    default: 'text',
    required: false,
  },
});
</script>
