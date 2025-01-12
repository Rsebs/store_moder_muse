<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          icon="bi-list"
          :ripple="false"
          dense
          flat
          @click="drawer = !drawer"
        />

        <q-btn
          label="Modern Muse"
          :ripple="false"
          :to="{ name: 'index' }"
          flat
        />

        <q-btn label="Logout" :ripple="false" flat @click="onLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      class="bg-grey-3"
      :breakpoint="500"
      :mini="miniState"
      :width="200"
      bordered
      mini-to-overlay
      show-if-above
      @mouseout="miniState = true"
      @mouseover="miniState = false"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <MenuComponent :items />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { MenuComponentItems } from '../../interfaces/componentsProps';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MenuComponent from '../components/MenuComponent.vue';

const router = useRouter();
const drawer = ref(false);
const miniState = ref(true);
const items: MenuComponentItems[] = [
  {
    label: 'Inicio',
    icon: 'bi-house-fill',
    nameRoute: 'index',
  },
  {
    label: 'Contacto',
    icon: 'bi-person-lines-fill',
    nameRoute: 'contact',
  },
  {
    label: 'Productos',
    icon: 'bi-tags-fill',
    nameRoute: 'products',
  },
];

const onLogout = () => {
  sessionStorage.removeItem('token');
  router.push({ name: 'login' });
};
</script>
