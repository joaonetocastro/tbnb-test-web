<template>
  <v-container fluid>
    <v-layout column class="root">
      <!-- <v-row> -->
      <div
        class="tableActions d-flex flex-column flex-sm-row align-sm-center align-start justify-space-between"
      >
        <div class="d-flex align-center">
          <v-btn
            color="lime lighten-2"
            @click="$router.push({ name: 'products' })"
            >Voltar</v-btn
          >
        </div>
      </div>
      <h1 v-if="loadingData">Carregando os dados...</h1>
      <h1 v-if="!loadingData && movements.length == 0">
        Esse produto ainda não teve entradas ou saídas
      </h1>
      <v-simple-table
        height="300px"
        v-if="!loadingData && movements.length > 0"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Data</th>
              <th class="text-left">Quantidade</th>
              <th class="text-left">Tipo</th>
              <!-- <th class="text-left">Ações</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in movements" :key="item.name">
              <td>
                {{
                  new Intl.DateTimeFormat("pt-BR").format(new Date(item.date))
                }}
              </td>
              <td>{{ item.pivot.quantity }}</td>
              <td>
                <v-chip
                  :color="
                    item.type === 'in' ? 'green lighten-' : 'red lighten-'
                  "
                >
                  {{ item.type === "in" ? "Entrada" : "Saída" }}
                </v-chip>
              </td>
              <!-- <td>Ações</td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-layout>
  </v-container>
</template>

<script>
import MovementService from "../services/MovementService";

export default {
  name: "ProductMovementsView",

  components: {},
  async created() {
    this.loadingData = true;
    try {
      this.movements = await MovementService.getAll({
        id: this.$route.params.id
      });
    } catch (error) {
      console.log(error);
    }
    this.loadingData = false;
  },
  data: () => ({
    query: "",
    loadingData: true,
    headers: [
      { text: "Data", value: "date" },
      { text: "Quantidade", value: "quantity" },
      { text: "Tipo", value: "type" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    selectedMovement: null,
    movements: []
  })
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  padding: 15pt;
}
.tableActions > * {
  padding: 4pt;
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
}
.queryInput {
  max-width: 320px;
}
@media only screen and (max-width: 600px) {
  .queryInput {
    align-self: flex-end;
  }
}
.quantityInput {
  max-width: 60px;
}
.checkbox {
  max-width: 15px;
}
</style>
