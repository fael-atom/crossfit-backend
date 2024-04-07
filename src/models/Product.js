export class Product {
  constructor(data) {
    setProduct(data);
  }

  getProduct() {
    return {
      name: this.name,
      type: this.type,
      unitPrice: this.unitPrice,
      stockQuantity: this.stockQuantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setProduct(data) {
    this.name = data.name;
    this.type = data.type;
    this.unitPrice = data.UnitPrice;
    this.stockQuantity = data.quantity;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
