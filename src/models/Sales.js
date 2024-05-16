export class Sales {
  constructor(data) {
    this.setSales(data);
  }

  getSales() {
    return {
      id: this.id,
      userId: this.userId,
      salesProductsInfo: this.salesProductsInfo,
      createdAt: this.createdAt,
    };
  }

  setSales(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.salesProductsInfo = data.salesProductsInfo;
    this.createdAt = data.createdAt;
  }
}
