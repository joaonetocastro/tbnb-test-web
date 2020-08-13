import Axios from "axios";
export default {
  async getAll(product) {
    const response = await Axios.get(
      `${process.env.VUE_APP_API_HOST}/movements/${product.id}`
    );
    const movements = response.data;
    return movements;
  },
  async save(data) {
    const response = await Axios.post(
      `${process.env.VUE_APP_API_HOST}/movements`,
      data
    );
    if (response.data.error) {
      return Promise.reject(response.data.error);
    }
    return Promise.resolve(response.data);
  }
};
