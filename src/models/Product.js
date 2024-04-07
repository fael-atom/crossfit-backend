export class Product {
  constructor(data) {
    setProduct(data);
  }

  getProduct() {
    return {
      name: this.name,
      type: this.type,
      price: this.price,
      stockQuantity: this.stockQuantity,
    };
  }

  setProduct(data) {
    this.name = data.name;
    this.type = data.type;
    this.price = data.price;
    this.stockQuantity = data.quantity;
  }
}
