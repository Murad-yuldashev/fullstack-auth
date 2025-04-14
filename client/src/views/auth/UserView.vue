<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import type { User } from '@/types'

const authStore = useAuthStore();

const user = computed<User | any>(() => authStore.user)

onMounted(async () => {
  await authStore.getUser()
})
</script>

<template>
  <section class="user">
    <div class="container">
      <div v-if="user" class="card card-body mt-5">
        <h5 class="card-title">Username: {{user?.username}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Email: {{user?.email}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">First Name: {{user?.first_name}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user?.last_name }}</h6>
      </div>
      <h3 v-else class="not-found">Not found User</h3>
    </div>
  </section>
</template>

<style scoped>
.user {
  max-width: 40vw;
  margin: 0 auto;
}

.not-found {
  text-align: center;
  margin-top: 20px;
  color: #ff0000;
}
</style>
