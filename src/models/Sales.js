export class Sales {
  constructor(data) {
    this.setSales(data);
  }

  getSales() {
    return {
      id: this.id,
      productId: this.name,
      userId: this.type,
      createdAt: this.createdAt
    };
  }

  setSales(data) {
    this.id = data.id;
    this.productId = data.productId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
  }
}
