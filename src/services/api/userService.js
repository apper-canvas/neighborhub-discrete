import userData from '../mockData/user.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  constructor() {
    this.users = [...userData];
  }

  async getAll() {
    await delay(300);
    return [...this.users];
  }

  async getById(id) {
    await delay(250);
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  }

  async create(userData) {
    await delay(400);
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, userData) {
    await delay(350);
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = { ...this.users[index], ...userData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const deletedUser = this.users.splice(index, 1)[0];
    return { ...deletedUser };
  }
}

export default new UserService();