import Axios from "axios";
export default {
  async getAll() {
    const response = await Axios.get(
      `${process.env.VUE_APP_API_HOST}/products`
    );
    const products = response.data;
    return products;
  },
  async save(product) {
    let response;
    if (product.id) {
      response = await Axios.put(
        `${process.env.VUE_APP_API_HOST}/products/${product.id}`,
        product
      );
    } else {
      response = await Axios.post(
        `${process.env.VUE_APP_API_HOST}/products`,
        product
      );
    }
    if (response.data.error) {
      return Promise.reject(response.data.error);
    }
    return Promise.resolve(response.data);
  },
  async delete(product) {
    return await Axios.delete(
      `${process.env.VUE_APP_API_HOST}/products/${product.id}`
    );
  }
};
