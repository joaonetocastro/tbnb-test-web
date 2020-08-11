export class Product {
  constructor(productData) {
    const product = { ...emptyProduct, ...productData };
    return product;
  }
}

const emptyProduct = {
  name: "",
  quantity: 0,
  barcode: ""
};
