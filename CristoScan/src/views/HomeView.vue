<template>
<div>
  <NavView />  
  <div class="home">
		<b-table
		striped
		hover
		:items="transactions" :fields="fields" 
		label-sort-asc="" label-sort-desc="" label-sort-clear=""
		@row-clicked="onRowClicked"
    v-if="dataReady"
    class="txn_table"
		>
      <template #cell(block)="data">
          <a :href="'/block/'+data.item.block" class="record">{{data.item.block}}</a>
      </template>
		</b-table>
    <b-spinner variant="primary" v-if="!dataReady"></b-spinner>
	</div>
</div>
	
</template>

<script>
import NavView from '@/components/NavView.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    NavView
  },
  data:function(){
    return {
        fields: [
          {
              key: 'hash',
              label: 'Txn Hash',
              sortable: true
           },
           {
              key: 'block',
              label: 'Bloque',
              sortable: true
           },
           {
              key: 'age',
              label: 'Fecha',
              sortable: true
           },
           {
              key: 'from',
              label: 'Emisor',
              sortable: true
           },
           {
              key: 'to',
              label: 'Receptor',
              sortable: true
           },
           {
              key: 'value',
              label: 'Cantidad',
              sortable: true
           },
        ],
        transactions:[],
        dataReady: false,    
    }
  },
	created : async function(){
    let direccion = 'https://2a76-83-54-105-62.ngrok.io/obtenerCadena'
    axios.get(direccion).then(data => {
      for (const block in data.data.cadena){
        for (const transaction in data.data.cadena[block].transacciones) {
          if (Object.hasOwnProperty.call(data.data.cadena[block].transacciones, transaction)) {
            const element = data.data.cadena[block].transacciones[transaction];
            var tiempo = new Date(data.data.cadena[block].fecha)
            let tx = {
              block: data.data.cadena[block].indice,
              hash : element.hash,
              age : tiempo.toLocaleString('es-ES'),
              from : element.emisor,
              to : element.receptor,
              value : element.cantidad
            }
            this.transactions.push(tx)
          }
        }
      }
    }).catch(e => console.log(e));

    this.dataReady = true
  },
  methods:{
    onRowClicked(record){
		this.$router.push('/tx/' + record.hash)
    }
  }
}
</script>

<style>
.home{
    margin: 100px;
}

.txn_table{
  border: 1px solid #000;
  cursor: pointer;
}

.record{
  text-decoration:none;
  color: #000;
}
.record:hover{
  text-decoration:none;
  color: #000;
}
</style>