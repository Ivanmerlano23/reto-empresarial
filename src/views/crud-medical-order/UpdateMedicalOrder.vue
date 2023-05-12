<script lang="ts">
import { useOrder } from '@/composable/useOrder'
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import router from '@/router'
import type { MedicalOrder } from '@/types/medical-orders'
import NavBar from '../../components/layout/NavBar.vue'
import type { Medicine } from '@/types/medicines'
import { useMedicine } from '@/composable/useMedicine'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, required, numeric } from '@vuelidate/validators'

export default defineComponent({
  name: 'DeleteMedicalOrder',
  setup() {
    const { updateOrder } = useOrder()
    const { getMedicines } = useMedicine()
    let medicines = ref<Medicine[]>([])
    const UID = ref({
      uid: ''
    })

    const rules2 = computed(() => ({
      uid: { required }
    }))

    //UID VALIDATE
    const v$2 = useVuelidate(rules2, UID)

    const order = ref<MedicalOrder>({
      name: '',
      lastName: '',
      idNumber: '',
      eps: '',
      medicines: [],
      comments: '',
      doctorSignature: ''
    })

    const rules = computed(() => ({
      name: { required },
      lastName: { required },
      idNumber: { required, numeric, maxLenght: maxLength(12) },
      eps: { required },
      medicines: [],
      comments: { required },
      doctorSignature: { required }
    }))

    //DATA VALIDATE
    const v$ = useVuelidate(rules, order)
    const upd = async () => {
      try {
        const isForm = await v$2.value.$validate()
        if (!isForm) return
        const isFormValid = await v$.value.$validate()
        if (!isFormValid) {
          return
        }
        const success = await updateOrder(UID.value.uid, order.value)
        if (success) {
          alert('Medicina Actualizada')
          router.push({ name: 'home' })
        }
      } catch (e) {
        alert(e)
      }
    }

    const getRecords = async () => {
      medicines.value = await getMedicines()
    }

    const cancelar = () => {
      router.push({ name: 'home' })
    }

    return {
      order,
      UID,
      upd,
      medicines,
      getRecords,
      cancelar,
      v$,
      v$2
    }
  },
  components: { NavBar }
})
</script>

<template>
  <NavBar />
  <div class="card">
    <div class="card-content">
      <h1 class="title has-text-centered">Actualizar - Orden Médica</h1>
      <div class="field">
        <label class="label">UID<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$2.uid.$model" class="input" type="text" placeholder="UID" />
        </div>
        <p v-if="v$2.uid.$error" class="has-text-danger">Campo obligatorio</p>
        <p class="help">Ejemplo: P1aWabm7oGqnZvtyQqMK - (Firebase)</p>
      </div>

      <div class="field">
        <label class="label">Nombre<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$.name.$model" class="input" type="text" placeholder="Nombre" />
        </div>
        <p v-if="v$.name.$error" class="has-text-danger">Campo obligatorio</p>
      </div>

      <div class="field">
        <label class="label">Apellido<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$.lastName.$model" class="input" type="text" placeholder="Apellido" />
        </div>
        <p v-if="v$.lastName.$error" class="has-text-danger">Campo obligatorio</p>
      </div>

      <div class="field">
        <label class="label">Cedula<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$.idNumber.$model" class="input" type="text" placeholder="Cedula" />
        </div>
        <p v-if="v$.idNumber.maxLenght.$invalid" class="has-text-danger">Límite de 12 carácteres</p>
        <p v-if="v$.idNumber.required.$invalid" class="has-text-danger">Campo obligatorio</p>
        <p v-if="v$.idNumber.numeric.$invalid" class="has-text-danger">Campo debe ser númerico</p>
      </div>

      <div class="control">
        <label class="label">Medicamento</label>
        <div class="select">
          <select>
            <option selected>Seleccione una opción</option>
            <option v-for="(medicine, idx) in medicines" :key="idx" :value="medicine.name">
              {{ medicine.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">EPS<span class="has-text-danger">*</span></label>
        <div class="control has-icons-left">
          <div class="select is-fullwidth">
            <select v-model="v$.eps.$model">
              <option value="SURA" selected>SURA</option>
              <option value="PONAL">PONAL</option>
              <option value="SALUD TOTAL">SALUD TOTAL</option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <i class="fa fa-building"></i>
          </div>
          <p v-if="v$.eps.$error" class="has-text-danger">Campo obligatorio</p>
        </div>
      </div>

      <div class="field">
        <label class="label">Comentarios</label>
        <div class="control">
          <textarea v-model="order.comments" class="textarea" placeholder="Comentarios"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Firma del encargado<span class="has-text-danger">*</span></label>
        <div class="control">
          <input
            v-model="v$.doctorSignature.$model"
            class="input"
            type="text"
            placeholder="Firma del encargado"
          />
        </div>
        <p v-if="v$.doctorSignature.$error" class="has-text-danger">Campo obligatorio</p>
      </div>

      <div class="field">
        <button class="button is-primary" @click="upd">Actualizar</button>
        <button class="button is-primary" style="margin-left: 3px" @click="cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
