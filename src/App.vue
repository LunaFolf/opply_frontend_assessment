<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthenticationStore } from "@/stores/authentication"
const authStore = useAuthenticationStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <template v-if="authStore.userIsAuthenticated">
          <RouterLink to="/">Home</RouterLink>
        </template>

        <template v-if="authStore.userIsAuthenticated">
          <RouterLink to="/suppliers">Suppliers</RouterLink>
          <RouterLink to="/quotes">Quotes</RouterLink>

          <!-- Always put last -->
          <a href="#" @click="authStore.logout()">Logout</a>
        </template>

        <template v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/signup">Sign up</RouterLink>
        </template>
      </nav>
      <small><strong>Current Auth Token: </strong> {{ authStore.token }}</small>
    </div>
  </header>

  <Suspense>
    <RouterView />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style scoped>
header {
  width: 100%
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
