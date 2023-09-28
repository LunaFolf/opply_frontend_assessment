<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authentication"
const store = useAuthenticationStore()
</script>

<template>
  <div>
    <button @click="store.login('username', 'password')">Login</button>
  </div>
</template>