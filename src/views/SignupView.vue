<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authentication"
import {computed, ref} from "vue";
const store = useAuthenticationStore()

const username = ref('')
const password = ref('')

const first_name = ref('')
const last_name = ref('')
const email = ref('')

const canSubmit = computed(() => {
  return username.value.length
    && password.value.length
    && first_name.value.length
    && last_name.value.length
    && email.value.length // TODO: There has gotta be a better way to do this...
})

const submit = () => {
  if (!canSubmit.value) return
  store.signup(username.value, password.value, first_name.value, last_name.value, email.value)
}
</script>

<template>
  <div style="display: grid; gap: .5rem">
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

    <label for="first_name">First Name</label>
    <input
      v-model="first_name"
      type="text"
      name="first_name"
      @keydown.enter="submit"
    />

    <label for="last_name">Surname</label>
    <input
      v-model="last_name"
      type="text"
      name="last_name"
      @keydown.enter="submit"
    />

    <label for="email">Email</label>
    <input
      v-model="email"
      type="email"
      name="email"
      @keydown.enter="submit"
    />

    <button :disabled="!canSubmit" @click="submit">Login</button>
  </div>
</template>