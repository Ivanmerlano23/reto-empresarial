<script setup lang="ts">
import { ref } from 'vue'
// import LoadingSkeleton from '../components/shared/LoadingSkeleton.vue'
import MedicineModal from '../components/medicines/MedicineModal.vue'
import CustomTable from '../components/shared/CustomTable.vue'
import Welcome from '../components/common/Welcome.vue'
import { useMedicine } from '../composable/useMedicine'
import type { Medicine } from '@/types/medicines'
import type { BaseColumn } from '@/types/shared'
import NavBar from '../components/layout/NavBar.vue'
import router from '@/router'

const { getMedicines, createMedicine } = useMedicine()

let isLoading = ref(false)
let isModalOpen = ref(false)
const rows = ref<Medicine[]>([])
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

const getRecords = async () => {
  isLoading.value = true
  const response = await getMedicines()
  rows.value = response
  isLoading.value = false
}

const handleAddMedicine = async (medicine: string) => {
  try {
    await createMedicine(JSON.parse(medicine) as Medicine)
    isModalOpen.value = false
    getRecords()
  } catch (error) {
    console.log(error)
  }
}

getRecords()
</script>

<template>
  <NavBar/>
  <div class="columns is-multiline">
    <div class="column is-12 mt-5 mb-5">
      <Welcome message="Bienvenid@!!" />
    </div>

    <!-- Buttons -->
    <div class="column is-12 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
      <button class="button is-primary" style="margin-left: 3px" @click="() => router.push({ name: 'read-medicine' })">
        Consultar
      </button>
      <button class="button is-primary" style="margin-left: 3px" @click="() => router.push({ name: 'update-medicine' })">
        Actualizar
      </button>
      <button class="button is-primary" style="margin-left: 3px" @click="() => router.push({ name: 'delete-medicine' })">
        Eliminar
      </button>
    </div>

    <div class="column is-12">
      <!-- <LoadingSkeleton v-if="isLoading" /> -->
      <CustomTable :cols="columns" :rows="rows" />
    </div>

    <MedicineModal
      :is-open="isModalOpen"
      @hide="isModalOpen = !isModalOpen"
      @save="handleAddMedicine"
    />
  </div>
</template>
