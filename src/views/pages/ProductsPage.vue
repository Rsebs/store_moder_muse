<template>
  <p v-if="!Object.keys(products).length" class="text-h6">Cargando...</p>
  <pre v-else>{{ products }}</pre>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import AxiosService from '../../services/axiosService';

const products = reactive({});

onMounted(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await AxiosService.get('products');
    Object.assign(products, response);
  } catch (error) {
    console.error(error);
  }
};
</script>
