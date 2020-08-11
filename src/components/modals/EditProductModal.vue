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
            :disabled="sendingData"
          />
          <v-text-field
            v-model="product.barcode"
            label="Cód. de barras"
            placeholder="xxxxxxxxxxxx"
            outlined
            :disabled="sendingData"
          />
          <v-alert
            type="success"
            border="bottom"
            dense
            text
            elevation="5"
            v-if="success"
          >
            Produto atualizado com sucesso
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="save()"
            :disabled="sendingData"
            >Salvar</v-btn
          >
          <v-btn
            color="red darken-1"
            text
            @click="close()"
            :disabled="sendingData"
            >Cancelar</v-btn
          >
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
    open: false,
    success: false,
    sendingData: false
  }),
  created() {
    this.open = Boolean(this.product);
  },
  methods: {
    async save() {
      this.sendingData = true;
      try {
        if (this.product) {
          await ProductService.save(this.product);
          this.success = true;
          setTimeout(() => {
            this.afterEdit(this.product);
            this.close();
          }, 800);
        }
      } catch (error) {
        console.error(error);
      }
      this.sendingData = true;
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
