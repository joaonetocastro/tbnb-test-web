import Axios from "axios";
export default {
  async getAll() {
    const response = await Axios.get(`${process.env.VUE_APP_API_HOST}/products`);
    const products = response.data;
    return products;
  },
  async save(product) {
    if (product.id) {
      return await Axios.put(
        `${process.env.VUE_APP_API_HOST}/products/${product.id}`,
        product
      ).data;
    } else {
      return await Axios.post(
        `${process.env.VUE_APP_API_HOST}/products`,
        product
      ).data;
    }
  }
};
