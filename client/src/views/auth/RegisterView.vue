<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RegisterData } from '@/types'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const errorMessage = ref<string>('')

const showPassword = ref(true);
const showConfirmPassword = ref(true);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const registerData = reactive<RegisterData>({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirm: ''
});

const registerSubmit = async () => {
  console.log(registerData);
  try {
    await authStore.register(registerData)
      .then(() => {
        // Redirect to login page or home page
        router.replace({ name: 'Login' });
      });
  } catch (error: Error | any) {
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <section class="vh-100 bg-image"
           style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');"
  >
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px;">
              <div class="card-body p-5">
                <h3 class="text-uppercase text-center mb-4">Create an account</h3>
                <h3 v-if="errorMessage" class="danger-error">{{errorMessage}}</h3>
                <form @submit.prevent="registerSubmit">
                  <pre>{{registerData}}</pre>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="first-name">First Name</label>
                    <input v-model="registerData.first_name" type="text" id="first-name" class="form-control form-control-lg" />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="last-name">Last Name</label>
                    <input v-model="registerData.last_name" type="text" id="last-name" class="form-control form-control-lg" />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form3Example1cg">User Name</label>
                    <input v-model="registerData.username" type="text" id="form3Example1cg" class="form-control form-control-lg" />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form3Example3cg">Your Email</label>
                    <input v-model="registerData.email" type="email" id="form3Example3cg" class="form-control form-control-lg" />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4 relative">
                    <label class="form-label" for="form3Example4cg">Password</label>
                    <input
                      v-model="registerData.password"
                      :type="showPassword ? 'password' : 'text'"
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                    />
                    <div @click="togglePassword" class="absolute">
                      <img :src="showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'" alt="eye">
                    </div>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4 relative">
                    <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                    <input
                      v-model="registerData.password_confirm"
                      :type="showConfirmPassword ? 'password' : 'text'"
                      id="form3Example4cdg"
                      class="form-control form-control-lg"
                    />

                    <div @click="toggleConfirmPassword" class="absolute">
                      <img :src="showConfirmPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'" alt="eye">
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button  type="submit"
                             data-mdb-ripple-init
                             class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Register
                    </button>
                  </div>

                  <p class="text-center text-muted mt-4 mb-0">Have already an account?
                    <router-link :to="{name: 'Login'}" class="fw-bold text-body"><u>Login here</u></router-link></p>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-custom-3 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
}
.gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
}

.relative {
  position: relative;
}

.absolute {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 90%;
}

.danger-error{
  color: red;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
