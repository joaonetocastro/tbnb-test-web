<template>
<v-container fluid>
  <v-layout column class="root">
    <!-- <v-row> -->
      <div class="tableActions d-flex flex-column flex-sm-row align-sm-center align-start justify-space-between">
      <v-btn color="blue dark-1" @click="createProduct()">Adicionar produto</v-btn>
  <v-text-field
  class="queryInput"
        v-model="query"
        append-icon="search"
        label="Search"
        single-line
        hide-details
            solo
      ></v-text-field>
      </div>
    <!-- </v-row> -->
  <v-data-table
    :headers="headers"
    :items="transactions"
    :search="query"
    class="elevation-1"
    loading:="loadingData"
    loading-text="Carregando dados..."
  >
  <template v-slot:item.actions="{  }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: "TransationListView",

  components: {},
  created() {

  },
  data: () => ({
    query: '',
    loadingData: true,
    headers: [
      { text: "Quantidade", value: "quantity" },
      { text: "Tipo", value: "type" },
      { text: "status", value: "type" },
      { text: "Data", value: "date" },
      {text: 'Ações', value: 'actions', sortable: false}
    ],
    transactions: [],
    selectedTransaction: null,
  }),
};
</script>

<style scoped>
.root{
  display: flex;
  flex-direction: column;
  padding: 15pt;
}
.tableActions > *{
  padding: 4pt;
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
}
.queryInput{
  max-width: 320px;

}
@media only screen and (max-width: 600px) {
  .queryInput{
    align-self: flex-end;
  }
}
</style>