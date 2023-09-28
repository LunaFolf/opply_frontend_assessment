<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authentication"
import {computed, ref} from "vue";
const store = useAuthenticationStore()

const username = ref('')
const password = ref('')

const canSubmit = computed(() => {
  return username.value.length && password.value.length
})

const submit = () => {
  if (!canSubmit.value) return
  store.login(username.value, password.value)
}
</script>

<template>
  <div style="display: grid; gap: 1rem">
    <label for="username">Username</label>
    <input
      v-model="username"
      type="text"
      name="username"
      @keydown.enter="submit"
    />

    <label for="password">Password</label>
    <input
      v-model="password"
      type="password"
      name="password"
      @keydown.enter="submit"
    />


    <button @click="submit" :disabled="!canSubmit">Login</button>
  </div>
</template>