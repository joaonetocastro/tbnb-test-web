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
    :items="products"
    :search="query"
    :sort-by="['name']"
    :sort-asc="[true]"
    class="elevation-1"
    loading:="loadingData"
    loading-text="Carregando dados..."
  >
  <template v-slot:item.actions="{ item: product }">
      <v-icon
        small
        class="mr-2"
        @click="listTransactions(product)"
      >
        mdi-text-box-multiple
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editProduct(product)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="deleteProduct(product)"
      >
        mdi-delete
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
import {Product} from '../models/Produt';
export default {
  name: "ProductListView",

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
    async createProduct(){
      this.selectedProduct = new Product({});
    },
    async deleteProduct(product){
      try{
        await ProductService.delete(product);
        this.products = this.products.filter((productData) => productData.id !== product.id)
      }catch(err){
        console.error(err);
      }
    },
    listTransactions(product){
      this.$router.push({name:'transactions',params: {product}});
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
      console.log(this.products);
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