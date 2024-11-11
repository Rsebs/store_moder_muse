<template>
  <div class="login">
    <q-card class="login__card column justify-center q-px-lg">
      <q-form @submit.prevent="onSubmit">
        <q-card-section>
          <h2 v-text="isFormLogin ? 'Login' : 'Signup'" class="login__title" />
        </q-card-section>
        <q-card-section class="column q-gutter-xl">
          <template v-for="input in inputs" :key="input.key">
            <component
              v-if="input.showInput"
              :is="MorphInputs[input.nameComponent]"
              v-model="body[input.key]"
              :label="input.label"
              :dark="input.dark"
              :iconAppend="input.iconAppend"
              :type="input.type"
              :color="input.color"
              :outlined="input.outlined"
              :rounded="input.rounded"
            />
          </template>
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
import { InputComponent } from '../../interfaces/componentsProps';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import AxiosService from '../../services/axiosService';
import MorphInputs from '../components/Inputs';

const router = useRouter();

const body: Record<string, string> = reactive({});
const loading = ref(false);
const rememberMe = ref(false);
const isFormLogin = ref(true);

const inputs: (InputComponent & Record<string, unknown>)[] = reactive([
  {
    nameComponent: 'InputText',
    key: 'name',
    label: 'Name',
    color: 'grey-4',
    labelColor: 'grey-4',
    iconAppend: 'bi-person-fill',
    dark: true,
    outlined: true,
    rounded: true,
    showInput: false,
  },
  {
    nameComponent: 'InputText',
    key: 'email',
    color: 'grey-4',
    dark: true,
    iconAppend: 'bi-envelope-at-fill',
    label: 'Email',
    outlined: true,
    rounded: true,
    type: 'email',
    showInput: true,
  },
  {
    nameComponent: 'InputText',
    key: 'password',
    color: 'grey-4',
    dark: true,
    iconAppend: 'bi-lock-fill',
    label: 'Password',
    outlined: true,
    rounded: true,
    type: 'password',
    showInput: true,
  },
  {
    nameComponent: 'InputText',
    key: 'passwordConfirm',
    color: 'grey-4',
    dark: true,
    iconAppend: 'bi-lock-fill',
    label: 'Confirm Password',
    outlined: true,
    rounded: true,
    type: 'password',
    showInput: false,
  },
]);

const onSubmit = async () => {
  try {
    loading.value = true;
    const endpoint = isFormLogin.value ? 'login' : 'signup';

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
  inputs.forEach((input) => {
    if (input.model === 'name' || input.model === 'passwordConfirm')
      input.showInput = !isFormLogin.value;
  });
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
