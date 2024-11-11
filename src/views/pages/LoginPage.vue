<template>
  <div class="login">
    <q-card class="login__card column justify-center q-px-lg">
      <q-form @submit.prevent="onSubmit">
        <q-card-section>
          <h2 v-text="isFormLogin ? 'Login' : 'Signup'" class="login__title" />
        </q-card-section>
        <q-card-section class="column q-gutter-xl">
          <q-input
            v-if="!isFormLogin"
            v-model="name"
            label="Name"
            color="grey-4"
            label-color="grey-4"
            dark
            outlined
            rounded
          >
            <template v-slot:append>
              <q-icon name="bi-person-fill" color="grey-4" />
            </template>
          </q-input>

          <q-input
            v-model="email"
            color="grey-4"
            label-color="grey-4"
            label="Email"
            type="email"
            dark
            outlined
            rounded
          >
            <template v-slot:append>
              <q-icon name="bi-envelope-at-fill" color="grey-4" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            autocomplete="on"
            color="grey-4"
            label-color="grey-4"
            label="Password"
            type="password"
            dark
            outlined
            rounded
          >
            <template v-slot:append>
              <q-icon name="bi-lock-fill" color="grey-4" />
            </template>
          </q-input>

          <q-input
            v-if="!isFormLogin"
            v-model="confirmPassword"
            autocomplete="on"
            color="grey-4"
            label-color="grey-4"
            label="Confirm Password"
            type="password"
            dark
            outlined
            rounded
          >
            <template v-slot:append>
              <q-icon name="bi-lock-fill" color="grey-4" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <div class="login__bottom column q-gutter-lg">
            <div v-if="isFormLogin" class="text-white row items-center">
              <q-checkbox
                v-model="rememberMe"
                class="col-6"
                color="primary"
                label="Recuérdeme"
                dark
              />
              <p
                class="login__link col-6 text-weight-bold cursor-pointer text-subtitle1 q-ma-none text-right"
                @click="
                  () =>
                    console.log('Envío de correo para restablecer contraseña')
                "
              >
                Olvidaste tu contraseña?
              </p>
            </div>
            <q-btn
              class="login__button"
              color="grey-4"
              text-color="black"
              type="submit"
              :label="isFormLogin ? 'Login' : 'Signup'"
              :loading
              rounded
            />
            <p v-if="isFormLogin" class="text-white text-center">
              ¿No tienes una cuenta?
              <span
                class="login__link text-weight-bold cursor-pointer text-subtitle1"
                @click="onChangeForm"
              >
                Registrarse
              </span>
            </p>
            <p v-else class="text-white text-center">
              ¿Ya tienes una cuenta?
              <span
                class="login__link text-weight-bold cursor-pointer text-subtitle1"
                @click="onChangeForm"
              >
                Iniciar sesión
              </span>
            </p>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AxiosService from '../../services/axiosService';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const rememberMe = ref(false);
const isFormLogin = ref(true);

const onSubmit = async () => {
  try {
    loading.value = true;
    const endpoint = isFormLogin.value ? 'login' : 'signup';

    const body: Record<string, unknown> = {
      email: email.value,
      password: password.value,
    };

    if (!isFormLogin.value) {
      body.name = name.value;
      body.confirmPassword = confirmPassword.value;
    }

    const { data } = await AxiosService.post(endpoint, body);

    sessionStorage.setItem('token', data.token);
    router.replace({ name: 'index' });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const onChangeForm = () => {
  isFormLogin.value = !isFormLogin.value;
};
</script>

<style lang="scss">
@use '/src/styles/quasar/quasar-variables.scss' as qv;

.login {
  align-items: center;
  background-image: url('/src/assets/img/pages/login-page.jpg');
  display: flex;
  height: 100vh;
  justify-content: center;

  &__card {
    backdrop-filter: blur(10px);
    background: #ffffff00;
    height: 70%;
    width: 30%;
  }

  &__title {
    color: qv.$white;
    font-weight: 600;
    margin: 20px;
    text-align: center;
  }

  &__link {
    transition-duration: 0.3s;

    &:hover {
      color: darken($color: qv.$primary, $amount: 0%);
    }
  }
}
</style>
