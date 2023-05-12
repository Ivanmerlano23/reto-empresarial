<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import firebase from 'firebase'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import router from '@/router'

export default defineComponent({
  name: 'Register',
  setup() {
    const account = ref({
      nameA: '',
      email: '',
      password: '',
      sexo: 'Selecciona',
      termAndConditions: true
    })

    const rules = computed(() => ({
      nameA: { required },
      email: { required },
      password: { required },
      sexo: { required },
      termAndConditions: { required }
    }))

    const v$ = useVuelidate(rules, account)

    const handleRegister = async () => {
      const isForm = await v$.value.$validate()
      if (!isForm) return

      firebase
        .auth()
        .createUserWithEmailAndPassword(account.value.email, account.value.password)
        .then(
          (user) => {
            console.log(user)
            router.push({ name: 'login'})
          },
          (err) => {
            alert(err)
          }
        )
    }

    const cancelar = () => {
      router.push({ name: 'login' })
    }
    return {
      account,
      v$,
      handleRegister,
      cancelar
    }
  }
})
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Registro</h1>
    <div class="field">
      <label class="label">Nombre</label>
      <div class="control">
        <input v-model="v$.nameA.$model" class="input" type="text" placeholder="Nombre" />
      </div>
      <p v-if="v$.nameA.$error" class="has-text-danger">Campo obligatorio</p>
    </div>

    <div class="field">
      <label class="label">Email</label>
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
      <label class="label">Contraseña</label>
        <input v-model="v$.password.$model" class="input" type="password" placeholder="Contraseña" />
      <p v-if="v$.password.$error" class="has-text-danger">Campo obligatorio</p>
    </div>

    <div class="field">
      <label class="label">Sexo</label>
      <div class="control">
        <div class="select">
          <select v-model="v$.sexo.$model">
            <option>{{ account.sexo }}</option>
            <option>Femenino</option>
            <option>Masculino</option>
          </select>
        </div>
      </div>
      <p v-if="v$.sexo.$error" class="has-text-danger">Campo obligatorio</p>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="v$.termAndConditions.$model" type="checkbox" />
          Estoy de acuerdo <a href="#">términos y condiciones</a>
        </label>
      </div>
      <p v-if="v$.termAndConditions.$error" class="has-text-danger">Campo obligatorio</p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" @click="handleRegister">
          Registro
        </button>
      </div>
      <div class="control">
        <button class="button is-primary" @click="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
