
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  setup(){
    let user = ref("")
    let password = ref("")

    return{
      user,
      password
    }
  }
})


</script>


<template>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="field">
            <h1 class="title has-text-centered">Login</h1>
            <p class="control has-icons-left has-icons-right">
              <input v-model="user" class="input" type="email" placeholder="Email" />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="password" class="input" type="password" placeholder="Password" />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="login">
              <button class="button is-success">Login</button>
              <a class="button is-success" style="margin-left: 3px;"><RouterLink to="/register"> Register </RouterLink></a>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.card{
  max-width: 100%;
}
</style>

