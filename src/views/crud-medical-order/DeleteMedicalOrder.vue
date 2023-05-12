<script lang="ts">
import { useOrder } from '@/composable/useOrder'
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import NavBar from '../../components/layout/NavBar.vue'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'DeleteMedicalOrder',
  setup() {
    const { deleteOrder } = useOrder()
    const UID = ref({
      uid: ''
    })

    const rules = computed(() => ({
      uid: { required }
    }))

    const v$ = useVuelidate(rules, UID)
    const del = async () => {
      try {
        const isForm = await v$.value.$validate()
        if (!isForm) return
        
        const success = await deleteOrder(UID.value.uid)
        if (success == true) {
          alert('Orden Médica Eliminada')
          router.push({ name: 'home' })
        }
      } catch (error) {
        alert(error)
      }
    }

    const cancelar = () => {
      router.push({ name: 'home' })
    }
    return {
      UID,
      del,
      cancelar,
      v$
    }
  },
  components: { NavBar }
})
</script>

<template>
  <NavBar />
  <div class="card">
    <div class="card-content">
      <h1 class="title has-text-centered">Eliminar - Orden Médica</h1>
      <div class="field">
        <label class="label">UID</label>
        <div class="control">
          <input v-model="v$.uid.$model" class="input" type="text" placeholder="UID" />
        </div>
        <p v-if="v$.uid.$error" class="has-text-danger">Campo obligatorio</p>
        <p class="help">Ejemplo: P1aWabm7oGqnZvtyQqMK - (Firebase)</p>
      </div>
      <div class="field">
        <button class="button is-primary" @click="del">Eliminar</button>
        <button class="button is-primary" style="margin-left: 3px" @click="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
