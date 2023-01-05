<template>
  <div class="ancho centra">
    <h2>Estimado {{ nombreCompleto }}</h2>
    <h2> Muchas gracias por tu registro</h2>
    <h2>Estas son tus credenciales:</h2>
    <h3>usuario: {{ user }}</h3>
    <h3>Clave: {{ clave }}</h3>
    <a href='https://artemisa.ultrasist.net/login/index.php' target='_blank'>https://artemisa.ultrasist.net</a>
    <a href='https://register.ultrasist.net'>back</a>
  </div>
</template>

<script>
import store from '../store'

export default {

   data: function () {
       return {
          nombreCompleto: store.state.nombreCompleto,
          clave: store.state.gen,
          user: store.state.user,
          error: store.state.error,
       }
   },
   methods: {
   }
}
</script>

<style scoped>
.ancho {
  max-width: 560px;
}

.centra {
  margin: auto;
  padding-top: 10%;
}
</style>
