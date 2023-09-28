<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authentication"
const store = useAuthenticationStore()
</script>

<template>
  <div>
    <h1>Login page goes here :3</h1>
    <p><strong>Current Auth Token: </strong> {{ store.token }}</p>

    <p>Hit button to login</p>
    <button @click="store.login('username', 'password')">Login</button>
  </div>
</template>