export class User {
  constructor(data) {
    this.setUser(data);
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      status: this.status,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setUser(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.status = data.status;
    this.picture = data.picture;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
