<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { computed } from 'vue'
import type { State, User } from '@/types'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const user = computed<User | any>(() => authStore.user);
const isAuthenticated = computed<State | any>(() => authStore.isAuthenticated);

const logout = async () => {
  try {
    await authStore.logout();
    // Redirect to login page or home page
    router.replace({ name: 'Login' });
  } catch (error: Error | any) {
    console.error(error);
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'Home'}">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="appNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link" aria-current="page">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="isAuthenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ user?.username }}
            </a>
            <ul class="dropdown-menu">
              <li><router-link :to="{name: 'User'}" class="dropdown-item">Profile</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button @click="logout" class="dropdown-item btn btn-danger">Logout</button></li>
            </ul>
          </li>

          <template v-else>
            <li class="nav-item">
              <router-link :to="{name: 'Login'}" class="nav-link" aria-current="page">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'Register'}" class="nav-link" aria-current="page">Register</router-link>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>


<style scoped>

.dropdown-menu {
  left: -130px !important;
}
</style>
