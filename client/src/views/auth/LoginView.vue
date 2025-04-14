<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { LoginData } from '@/types'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const showPassword = ref(true);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const errorMessage = ref<string>('')

const loginData = reactive<LoginData>({
  email: '',
  password: ''
});

const loginSubmit = async () => {
  console.log(loginData);
  try {
    await authStore.login(loginData);
    router.replace({ name: 'Home' });
  } catch (error: Error | any) {
    // Handle error
    console.error(error);
    errorMessage.value = error.message
  }
}

</script>

<template>
  <section class="vh-100" style="background-color: #d7f4f2;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0 ">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://watermark.lovepik.com/photo/50064/5999.jpg_wh1200.jpg"
                     alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem; height: 100%" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <h3 v-if="errorMessage" class="danger-error">{{errorMessage}}</h3>
                  <form @submit.prevent="loginSubmit">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0">Logo</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="email">Email address</label>
                      <input v-model="loginData.email" type="email" id="email" class="form-control form-control-lg" />
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4 relative">
                      <label class="form-label" for="password">Password</label>
                      <input
                        v-model="loginData.password"
                        :type="showPassword ? 'password' : 'text'"
                        id="login_password"
                        class="form-control form-control-lg"
                      />

                      <div @click="togglePassword" class="absolute">
                        <img :src="showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'" alt="eye">
                      </div>
                    </div>

                    <div class="pt-1 mb-4">
                      <button data-mdb-button-init data-mdb-ripple-init
                              class="btn btn-dark btn-lg btn-block"
                              type="submit"
                      >Login
                      </button>
                    </div>

                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account?
                      <router-link :to="{name: 'Register'}" style="color: #393f81;">Register here</router-link>
                    </p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
