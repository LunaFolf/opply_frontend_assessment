<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authentication"
const store = useAuthenticationStore()

const userObject = {
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: ''
}

const getInputType = (inputName: string) => {
  if (inputName === 'password') return 'password'
  if (inputName === 'email') return 'email'
  return 'text'
}

const submit = () => {
  store.signup(userObject.username, userObject.password, userObject.first_name, userObject.last_name, userObject.email)
}
</script>

<template>
  <div>
    <div v-for="inputName in Object.keys(userObject)" :key="inputName">
      <label :for="inputName">{{ inputName }}</label>
      <input
        :name="inputName"
        :type="getInputType(inputName)"
        v-model="userObject[inputName]"
        @keydown.enter="submit"
      />
    </div>
    <button @click="submit">Login</button>
  </div>
</template>