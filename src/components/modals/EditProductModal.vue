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
            v-mask="'############'"
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
          <v-alert
            type="error"
            border="bottom"
            dense
            text
            elevation="5"
            v-if="fail"
          >
            {{ errorMessage }}
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
import errorMessages from "../../utils/errorMessages";
export default {
  name: "EditProducModal",
  props: ["product", "afterEdit"],
  data: () => ({
    open: false,
    status: null,
    sendingData: false,
    errorMessage: "",
    rules: { number: value => Boolean(Number(value)) || "Digite um número" }
  }),
  created() {
    this.open = Boolean(this.product);
  },
  methods: {
    async save() {
      if (!this.product.barcode) {
        this.setError(errorMessages.product.EMPTY_BARCODE);
        return;
      }
      if (!this.product.name) {
        this.setError(errorMessages.product.EMPTY_NAME);
        return;
      }
      this.sendingData = true;
      await ProductService.save(this.product)
        .then(() => {
          this.status = "success";
          setTimeout(() => {
            this.afterEdit(this.product);
            this.close();
          }, 800);
        })
        .catch(err => {
          this.setError(errorMessages.product[err.response.data.error]);
        })
        .finally(() => (this.sendingData = false));
    },
    close() {
      this.open = false;
      this.status = null;
    },
    setError(error) {
      this.errorMessage = error;
      this.status = "fail";
    }
  },
  computed: {
    success() {
      return this.status === "success";
    },
    fail() {
      return this.status === "fail";
    }
  },
  watch: {
    product() {
      this.open = Boolean(this.product);
    }
  }
};
</script>
