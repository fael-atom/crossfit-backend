export class Product {
  constructor(data) {
    this.setProduct(data);
  }

  getProduct() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      unitPrice: this.unitPrice,
      stockQuantity: this.stockQuantity,
    };
  }

  setProduct(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.unitPrice = data.unitPrice;
    this.stockQuantity = data.stockQuantity;
  }
}
