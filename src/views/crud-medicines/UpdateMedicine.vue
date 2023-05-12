<script lang="ts">
import { ref } from 'vue'
import { defineComponent, computed } from 'vue'
import router from '@/router'
import NavBar from '../../components/layout/NavBar.vue'
import type { Medicine } from '@/types/medicines'
import { useMedicine } from '@/composable/useMedicine'
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'

export default defineComponent({
  name: 'DeleteMedicine',
  setup() {
    const { updateMedicine } = useMedicine()
    const UID = ref({
      uid: ''
    })

    const rules2 = computed(() => ({
      uid: { required }
    }))

    //UID VALIDATE
    const v$2 = useVuelidate(rules2, UID)

    const medicine = ref<Medicine>({
      name: '',
      description: '',
      createdAt: '',
      qty: 0,
      provider: '',
      doctorSignature: ''
    })

    const rules = computed(() => ({
      name: { required },
      description: { required },
      qty: { required, minValue: minValue(1) },
      provider: { required },
      doctorSignature: { required }
    }))

    //DATA VALIDATE
    const v$ = useVuelidate(rules, medicine)

    const upd = async () => {
      try {
        const isFormValid = await v$.value.$validate()

        const isForm = await v$2.value.$validate()
        if (!isForm) return

        if (!isFormValid) {
          return
        }
        const success = await updateMedicine(UID.value.uid, medicine.value)
        if (success) {
          alert('Medicina Actualizada')
          router.push({ name: 'medicines' })
        }
      } catch (e) {
        alert(e)
      }
    }

    const cancelar = () => {
      router.push({ name: 'medicines' })
    }

    return {
      medicine,
      UID,
      upd,
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
      <h1 class="title has-text-centered">Actualizar - Medicina</h1>
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
        <label class="label">Descripción<span class="has-text-danger">*</span></label>
        <div class="control">
          <textarea
            v-model="v$.description.$model"
            class="textarea"
            placeholder="Descripción"
          ></textarea>
        </div>
        <p v-if="v$.description.$error" class="has-text-danger">Campo obligatorio</p>
      </div>

      <div class="field">
        <label class="label">Cantidad<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$.qty.$model" class="input" type="number" placeholder="Cantidad" />
        </div>
        <p v-if="v$.qty.minValue.$invalid" class="has-text-danger">La cantidad mínima es 1</p>
        <p v-if="v$.qty.required.$invalid" class="has-text-danger">Campo obligatorio</p>
      </div>

      <div class="field">
        <label class="label">Proveedor<span class="has-text-danger">*</span></label>
        <div class="control">
          <input v-model="v$.provider.$model" class="input" type="text" placeholder="Proveedor" />
        </div>
        <p v-if="v$.provider.$error" class="has-text-danger">Campo obligatorio</p>
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
