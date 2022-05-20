<template>
    <div>
      <NavView/>
      <b-row class="m-5">
        <b-col></b-col>
        <b-col cols=8>
          <div>
              <b-table
                striped
                hover
                stacked
                :items="items"
              ></b-table>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>

    </div>
</template>

<script>
import NavView from '@/components/NavView.vue'
import axios from 'axios'

export default {
    name: 'BlockView',
    components: {
        NavView
    },
    data() {
      return {
        items: []
      }
    },
    async created(){
        let direccion = 'https://2a76-83-54-105-62.ngrok.io/obtenerBloque/' + this.$route.params.block
        axios.get(direccion).then(data => {
          let bloque = data.data.bloque
          let transacciones = ''
          for (const transaccion of bloque.transacciones) {
            transacciones = transacciones + transaccion.hash +'\n'
          }
          var tiempo = new Date(bloque.fecha)
          let temp = {
            altura_del_bloque: bloque.indice,
            fecha: tiempo.toLocaleDateString('es-ES'),
            transacciones: transacciones,
            prueba_de_trabajo: bloque.pruebaTrabajo,
          }
          this.items.push(temp)
        }).catch(e => console.log(e));
    }
}

</script>

<style>

</style>