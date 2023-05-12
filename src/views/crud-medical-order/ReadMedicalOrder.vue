<script lang="ts">
import { useOrder } from '@/composable/useOrder'
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import NavBar from '../../components/layout/NavBar.vue'
import router from '@/router'
import type { MedicalOrder } from '@/types/medical-orders'
import type { BaseColumn } from '@/types/shared'
import CustomTable from '@/components/shared/CustomTable.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'ReadMedicalOrder',
  setup() {
    const { getOrder } = useOrder()
    const UID = ref({
      uid: ''
    })

    const rules = computed(() => ({
      uid: { required }
    }))

    const v$ = useVuelidate(rules, UID)

    const row = ref<MedicalOrder[]>([])
    const columns = ref<BaseColumn[]>([
      {
        label: 'Nombre',
        field: 'name'
      },
      {
        label: 'Apellido',
        field: 'lastName'
      },
      {
        label: 'Identificación',
        field: 'idNumber'
      },
      {
        label: 'EPS',
        field: 'eps'
      },
      {
        label: '#Medicinas',
        field: 'medicines'
      },
      {
        label: 'Comentarios',
        field: 'comments'
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
        const response = await getOrder(UID.value.uid)
        row.value = response.medicalOrder
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
      <h1 class="title has-text-centered">Consultar - Orden Médica</h1>
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
        <CustomTable :cols="columns" :rows="row" :has-medicines="true" />
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
