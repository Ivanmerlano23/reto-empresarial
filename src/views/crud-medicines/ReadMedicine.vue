<script lang="ts">
import { useMedicine } from '@/composable/useMedicine'
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import NavBar from '../../components/layout/NavBar.vue'
import router from '@/router'
import type { BaseColumn } from '@/types/shared'
import CustomTable from '@/components/shared/CustomTable.vue'
import type { Medicine } from '@/types/medicines'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'ReadMedicines',
  setup() {
    const { getMedicine } = useMedicine()
    const UID = ref({
      uid: ''
    })

    const rules = computed(() => ({
      uid: { required }
    }))

    const v$ = useVuelidate(rules, UID)
    const row = ref<Medicine[]>([])
    const columns = ref<BaseColumn[]>([
      {
        label: 'Nombre',
        field: 'name'
      },
      {
        label: 'Descripción',
        field: 'description'
      },
      {
        label: 'Fecha Creación',
        field: 'createdAt'
      },
      {
        label: 'Cantidad',
        field: 'qty'
      },
      {
        label: 'Proveedor',
        field: 'provider'
      },
      {
        label: 'Encargado',
        field: 'doctorSignature'
      }
    ])

    const cons = async () => {
      try {
        const isForm = await v$.value.$validate()
        if (!isForm) return
        const response = await getMedicine(UID.value.uid)
        row.value = response.medicine
      } catch (error) {
        alert(error)
      }
    }

    const cancelar = () => {
      router.push({ name: 'home' })
    }
    return {
      UID,
      cancelar,
      cons,
      columns,
      row,
      v$
    }
  },
  components: { NavBar, CustomTable }
})
</script>

<template>
  <NavBar />
  <div class="card">
    <div class="card-content">
      <h1 class="title has-text-centered">Consultar - Medicina</h1>
      <div class="field">
        <label class="label">UID</label>
        <div class="control">
          <input v-model="v$.uid.$model" class="input" type="text" placeholder="UID" />
        </div>
        <p v-if="v$.uid.$error" class="has-text-danger">Campo obligatorio</p>
        <p class="help">Ejemplo: P1aWabm7oGqnZvtyQqMK - (Firebase)</p>
      </div>
      <div class="column is-12">
        <!-- <LoadingSkeleton v-if="isLoading" /> -->
        <CustomTable :cols="columns" :rows="row" />
      </div>
      <div class="field">
        <button class="button is-primary" @click="cons">Consultar</button>
        <button class="button is-primary" style="margin-left: 3px" @click="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
