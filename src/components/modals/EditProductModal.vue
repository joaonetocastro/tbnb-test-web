<template>
  <v-row justify="center">
    <v-dialog :value="open" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Editar usuário</v-card-title>
        <v-card-text v-if="open">
          <v-text-field
            v-model="product.name"
            label="nome"
            placeholder="João
          Fulano"
            outlined
          />
          <v-text-field
            v-model="product.barcode"
            label="Cód. de barras"
            placeholder="xxxxxxxxxxxx"
            outlined
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="save()">Salvar</v-btn>
          <v-btn color="red darken-1" text @click="close()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import ProductService from "../../services/ProductService";
export default {
  name: "EditProducModal",
  props: ["product", "afterEdit"],
  data: () => ({
    open: false
  }),
  created() {
    this.open = Boolean(this.product);
  },
  methods: {
    async save() {
      try {
        if (this.product) {
          await ProductService.save(this.product);
          this.afterEdit(this.product);
          this.close();
        }
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.open = false;
    }
  },
  watch: {
    product() {
      this.open = Boolean(this.product);
    }
  }
};
</script>
