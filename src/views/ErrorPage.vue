<template>
    <div class="ancho centra">
      <h1>Error</h1>
      <h3>{{ error }}</h3>
    </div>
</template>

<script>
import store from '../store'

export default {

   data: function () {
       return {
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
