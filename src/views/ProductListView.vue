<template>
<v-container fluid>
  <v-layout column class="root">
  <v-text-field
  class="queryInput"
        v-model="query"
        append-icon="search"
        label="Search"
        single-line
        hide-details
            solo
      ></v-text-field>
  <v-data-table
    :headers="headers"
    :items="products"
    :sort-by="['calories', 'fat']"
    :sort-desc="[false, true]"
    :search="query"
    multi-sort
    class="elevation-1"
    loading:="loadingData"
    loading-text="Loading... Please wait"
  >
  <template v-slot:item.actions="{ item: product }">
      <v-icon
        small
        class="mr-2"
        @click="editProduct(product)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
  </v-layout>
  <edit-product-modal :product="selectedProduct" :afterEdit="loadProduct" />
</v-container>
</template>

<script>
import ProductService from "../services/ProductService";
import EditProductModal from '../components/modals/EditProductModal';
export default {
  name: "ProductListVue",

  components: {EditProductModal},
  created() {
    this.fetchData();
  },
  data: () => ({
    query: '',
    loadingData: true,
    headers: [
      { text: "Nome", value: "name" },
      { text: "Quantidade", value: "quantity" },
      { text: "C. de Barras", value: "barcode" },
      {text: 'Ações', value: 'actions', sortable: false}
    ],
    products: [],
    selectedProduct: null,
  }),
  methods: {
    async fetchData() {
      this.loadingData = true;
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
      // this.loadingData = false;
    },
    async editProduct(product){
      this.selectedProduct = {...product};
    },
    loadProduct(newProduct){
      let productFound = false;
      this.products = this.products.map(product => {
        if(product.id === newProduct.id){
          productFound = true;
          return newProduct;
        }
        return product;
      });
      if(!productFound) this.products.push(newProduct);
    }
  }
};
</script>

<style scoped>
.root{
  display: flex;
  flex-direction: column;
  padding: 15pt;
}
.queryInput{
  max-width: 420px;
  align-self: flex-end;
}
</style>