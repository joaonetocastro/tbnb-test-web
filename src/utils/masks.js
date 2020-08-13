export default {
  getQuantityMask(product) {
    return Array.from({ length: `${product.quantityChosen}`.length }).map(
      () => /[0-9]/
    );
  }
};
