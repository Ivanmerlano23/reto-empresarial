<script lang="ts">
import { useMedicine } from '@/composable/useMedicine'
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import NavBar from '../../components/layout/NavBar.vue'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'DeleteMedicine',
  setup() {
    const { deleteMedicine } = useMedicine()
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

        const success = await deleteMedicine(UID.value.uid)
        if (success) {
          alert('Medicina Eliminada')
          router.push({ name: 'medicines' })
        }
      } catch (error) {
        alert(error)
      }
    }

    const cancelar = () => {
      router.push({ name: 'medicines' })
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
      <h1 class="title has-text-centered">Eliminar - Medicina</h1>
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
