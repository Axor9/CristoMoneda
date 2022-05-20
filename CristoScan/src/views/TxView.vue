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
              >
                <template #cell(block)="data">
                    <a :href="'/block/'+data.item.block" class="record">{{data.item.block}}</a>
                </template>
              </b-table>
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
    name: 'TxView',
    components: {
        NavView
    },
	async created(){
        let direccion = 'https://2a76-83-54-105-62.ngrok.io/obtenerTransaccion/' + this.$route.params.hash
        axios.get(direccion).then(data => {
          let transaccion = data.data.transaccion
          let temp = {
            hash: transaccion.hash,
            emisor: transaccion.emisor,
            receptor: transaccion.receptor,
            cantidad: transaccion.cantidad,
          }          
          this.items.push(temp)
        }).catch(e => console.log(e));
    },
    data:function(){
        return{
            items: [],
        }
    },

}
</script>

<style>

</style>