export class Client {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
