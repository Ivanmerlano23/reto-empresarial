<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import firebase from 'firebase'
import router from '../router/index'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'Login',
  setup() {
    const account = ref({
      email: '',
      password: ''
    })

    const rules = computed(() => ({
      email: { required },
      password: { required }
    }))

    const register = () => router.push({ name: 'register'})

    const v$ = useVuelidate(rules, account)

    const handleLogin = async () => {
      const isForm = await v$.value.$validate()
      if (!isForm) return
      firebase
        .auth()
        .signInWithEmailAndPassword(account.value.email, account.value.password)
        .then(
          (user) => {
            console.log(user)
            router.push({ name: 'home' })
          },
          (err) => {
            alert(err)
          }
        )
    }

    return {
      account,
      handleLogin,
      v$,
      register
    }
  }
})
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="field">
          <h1 class="title has-text-centered">Iniciar Sesión</h1>
          <p class="control has-icons-left has-icons-right">
            <input v-model="v$.email.$model" class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
          <p v-if="v$.email.$error" class="has-text-danger">Campo obligatorio</p>
        </div>
        <div class="field">
            <input
              v-model="v$.password.$model"
              class="input"
              type="password"
              placeholder="Contraseña"
            />
          <p v-if="v$.email.$error" class="has-text-danger">Campo obligatorio</p>
        </div>
        <div class="field">
          <p class="login">
            <button class="button is-primary" @click="handleLogin">Iniciar Sesión</button>
            <button class="button is-primary" style="margin-left: 3px" @click="register">Crear Cuenta</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 100%;
}
</style>
