<template>
  <v-container fluid>
    <v-layout column class="root">
      <!-- <v-row> -->
      <div
        class="tableActions d-flex flex-column flex-sm-row align-sm-center align-start justify-space-between"
      >
        <v-btn-toggle shaped mandatory>
          <v-btn
            @click="setType('in')"
            color="lime lighten-2"
            :text="type !== 'in'"
          >
            Entrada
          </v-btn>
          <v-btn
            @click="setType('out')"
            color="deep-orange"
            :text="type !== 'out'"
          >
            Saída
          </v-btn>
        </v-btn-toggle>
        <div class="d-flex align-center">
          <v-btn color="lime lighten-2" class="mx-2" @click="save()">
            Enviar {{ type === "in" ? "entrada" : "saída" }}
          </v-btn>
          <v-text-field
            class="queryInput"
            v-model="query"
            append-icon="search"
            item-text="name"
            label="Search"
            single-line
            hide-details
            solo
          ></v-text-field>
        </div>
      </div>
      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">Nome</th>
              <th class="text-left">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.name">
              <td class="checkbox">
                <v-checkbox v-model="item.chosen" />
              </td>
              <td>{{ item.name }}</td>
              <td>
                <v-text-field
                  v-model="item.quantityChosen"
                  v-mask="getQuantityMask(item)"
                  :rules="[getQuantityRule(item)]"
                  type="number"
                  class="quantityInput"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-layout>
  </v-container>
</template>

<script>
import ProductService from "../services/ProductService";
import MovementService from "../services/MovementService";

export default {
  name: "TransationListView",

  components: {},
  async created() {
    this.loadingData = true;
    try {
      this.products = (await ProductService.getAll()).map(product => ({
        ...product,
        chosen: false,
        quantityChosen: "0"
      }));
    } catch (error) {
      console.log(error);
    }
    this.loadingData = false;
  },
  data: () => ({
    query: "",
    loadingData: true,
    headers: [
      { text: "Quantidade", value: "quantity" },
      { text: "Tipo", value: "type" },
      { text: "status", value: "type" },
      { text: "Data", value: "date" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    movements: [],
    selectedMovement: null,
    products: [],
    type: "in"
  }),
  methods: {
    setType(newType) {
      this.type = newType;
    },
    getQuantityMask(product) {
      return Array.from({ length: `${product.quantityChosen}`.length }).map(
        () => /[0-9]/
      );
    },
    getQuantityRule(product) {
      if (product.quantityChosen === "") return true;
      if (this.type === "in") return true;
      if (
        !isNaN(Number(product.quantityChosen)) &&
        Number(product.quantityChosen) >= 0 &&
        Number(product.quantityChosen) <= Number(product.quantity)
      ) {
        return true;
      }
      return "O produto não tem essa quantidade disponível";
    },
    save() {
      const chosenProducts = this.products.filter(product => product.chosen);
      for (const product of chosenProducts) {
        if (typeof this.getQuantityRule(product) === "string") return;
      }
      const data = {
        type: this.type,
        products: chosenProducts.map(product => ({
          id: product.id,
          quantity: product.quantityChosen
        }))
      };
      MovementService.save(data);
    }
  }
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
