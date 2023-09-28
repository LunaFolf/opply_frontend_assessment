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


        <a v-if="authStore.userIsAuthenticated" href="#" @click="authStore.logout()">Logout</a>
        <RouterLink v-else to="/login">Login</RouterLink>
      </nav>
      <p><strong>Current Auth Token: </strong> {{ authStore.token }}</p>
    </div>
  </header>

  <RouterView />
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
