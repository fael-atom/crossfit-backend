export class Sales {
  constructor(data) {
    this.setSales(data);
  }

  getSales() {
    return {
      id: this.id,
      userId: this.userId,
      salesProductsInfo: this.salesProductsInfo,
      total: this.total,
      isPaid: this.isPaid,
      createdAt: this.createdAt,
    };
  }

  setSales(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.salesProductsInfo = data.salesProductsInfo;
    this.total = data.total;
    this.isPaid = data.isPaid;
    this.createdAt = data.createdAt;
  }
}
