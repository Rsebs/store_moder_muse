<template>
  <q-list padding>
    <q-item
      v-for="item in items"
      :to="{ name: item.nameRoute }"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { MenuComponentItems } from '../../interfaces/componentsProps.ts';

defineProps({
  items: {
    type: Array as () => MenuComponentItems[],
    required: true,
  },
});
</script>
