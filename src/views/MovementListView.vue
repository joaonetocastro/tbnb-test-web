<template>
  <v-container fluid>
    <v-layout column class="root">
      <!-- <v-row> -->
      <div
        class="tableActions d-flex flex-column flex-sm-row align-sm-center align-start justify-space-between"
      >
        <div class="d-flex align-center">
          <v-btn
            class="mx-2"
            color="lime lighten-2"
            @click="$router.push({ name: 'products' })"
            >Voltar</v-btn
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
        </div>
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
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">Nome</th>
              <th class="text-left">Cód. de Barras</th>
              <th class="text-left">Quantidade</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredProducts" :key="item.id">
              <td class="checkbox">
                <v-checkbox v-model="item.chosen" />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.barcode }}</td>
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
            <template v-if="type === 'in'">
              <tr v-for="item in newProducts" :key="newProducts.indexOf(item)">
                <td class="checkbox"></td>
                <td>
                  <v-text-field
                    v-model="item.name"
                    :rules="[getNameRule(item)]"
                  />
                </td>

                <td>
                  <v-text-field
                    v-model="item.barcode"
                    :rules="[getBarcodeRule(item)]"
                    v-mask="'############'"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="item.quantityChosen"
                    v-mask="getQuantityMask(item)"
                    :rules="[getQuantityRule(item)]"
                    type="number"
                    class="quantityInput"
                  />
                </td>
                <td>
                  <v-icon small class="mr-2" @click="deleteProduct(item)">
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn color="cyan dark-1" class="ma-3" @click="addProduct()"
        >Adicionar novo produto</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
import ProductService from "../services/ProductService";
import MovementService from "../services/MovementService";
import normalizeWord from "../utils/normalizeWord";
const emptyProduct = {
  chosen: true,
  name: "",
  quantityChosen: 0,
  barcode: ""
};
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
    movements: [],
    selectedMovement: null,
    products: [],
    newProducts: [],
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
    getNameRule(product) {
      if (product.name !== "") return true;
      return "Nome inválido!";
    },
    getBarcodeRule(product) {
      if (product.barcode.length !== 12) return "Cód. de barras inválido!";
      if (this.products.filter(p => p.barcode === product.barcode).length !== 0)
        return "Cód. de barras inválido!";
      return true;
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
    addProduct() {
      this.newProducts.push({ ...emptyProduct });
    },
    deleteProduct(product) {
      this.newProducts = this.newProducts.filter(
        (p, index) => index !== this.newProducts.indexOf(product)
      );
    },
    async save() {
      const chosenProducts = this.products.filter(product => product.chosen);
      for (const product of chosenProducts) {
        if (typeof this.getQuantityRule(product) === "string") return;
      }
      if (this.type === "in") {
        for (const product of this.newProducts) {
          if (typeof this.getNameRule(product) === "string") return;
          if (typeof this.getBarcodeRule(product) === "string") return;
        }
      }
      const data = {
        type: this.type,
        products: chosenProducts.map(product => ({
          id: product.id,
          quantity: product.quantityChosen
        })),
        newProducts:
          this.type === "in"
            ? this.newProducts.map(product => ({
                ...product,
                quantity: Number(product.quantityChosen)
              }))
            : []
      };
      await MovementService.save(data);
      this.$router.push({ name: "products" });
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        if (product.chosen) return true;
        return (
          normalizeWord(product.name).includes(normalizeWord(this.query)) ||
          normalizeWord(product.barcode).includes(normalizeWord(this.query))
        );
      });
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
