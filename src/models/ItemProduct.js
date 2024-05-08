export class ItemProduct{
  constructor(data) {
    this.setItemProduct(data);
  }

  setItemProduct(data) {
    this.id = data.id;
    this.productId = data.productId;
    this.quantity = data.quantity;
  }
}