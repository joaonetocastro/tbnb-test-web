export default {
  getNameRule(product) {
    if (product.name !== "") return true;
    return "Nome inválido!";
  },
  getBarcodeRule(product, products) {
    if (product.barcode.length !== 12) return "Cód. de barras inválido!";
    if (products.filter(p => p.barcode === product.barcode).length !== 0)
      return "Cód. de barras inválido!";
    return true;
  },
  getQuantityRule(product, type) {
    if (product.quantityChosen === "") return true;
    if (type === "in") return true;
    if (
      !isNaN(Number(product.quantityChosen)) &&
      Number(product.quantityChosen) >= 0 &&
      Number(product.quantityChosen) <= Number(product.quantity)
    ) {
      return true;
    }
    return "O produto não tem essa quantidade disponível";
  }
};
