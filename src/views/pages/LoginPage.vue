<template>
  <q-form @submit.prevent="onLogin">
    <q-input v-model="email" type="email" placeholder="Email" />
    <q-input v-model="password" type="password" placeholder="Password" />

    <q-btn type="submit">Login</q-btn>
  </q-form>

  <q-form @submit.prevent="onSignup">
    <q-input v-model="name" placeholder="Name" />
    <q-input v-model="email" type="email" placeholder="Email" />
    <q-input v-model="password" type="password" placeholder="Password" />

    <q-btn type="submit">Signup</q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AxiosService from '../../services/axiosService';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const onLogin = async () => {
  try {
    const { data } = await AxiosService.post('login', {
      email: email.value,
      password: password.value,
    });

    sessionStorage.setItem('token', data.token);
    router.replace({ name: 'index' });
  } catch (error) {
    console.error(error);
  }
};

const onSignup = async () => {
  try {
    const { data } = await AxiosService.post('signup', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    sessionStorage.setItem('token', data.token);
    router.replace({ name: 'index' });
  } catch (error) {
    console.error(error);
  }
};
</script>
