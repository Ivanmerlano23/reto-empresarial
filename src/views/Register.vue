<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Register',
  setup() {
    let name = ref('')
    let email = ref('')
    let password = ref('')
    let sexo = ref('Select')
    let termAndConditions = ref(Boolean)

    return {
      email,
      password,
      name,
      sexo,
      termAndConditions
    }
  }
})
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Register</h1>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input v-mode="name" class="input" type="text" placeholder="Text input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <p class="control has-icons-left has-icons-right">
        <input v-model="email" class="input" type="email" placeholder="Email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <p class="control has-icons-left">
        <input v-model="password" class="input" type="password" placeholder="Password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">Sexo</label>
      <div class="control">
        <div class="select">
          <select v-model="sexo">
            <option>{{ sexo }}</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="termAndConditions" type="checkbox" />
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success">Register</button>
      </div>
      <div class="control">
        <button class="button is-success">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
