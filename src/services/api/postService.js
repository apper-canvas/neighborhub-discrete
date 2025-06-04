import postData from '../mockData/post.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PostService {
  constructor() {
    this.posts = [...postData];
  }

  async getAll() {
    await delay(350);
    return [...this.posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await delay(250);
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return { ...post };
  }

  async create(postData) {
    await delay(400);
    const newPost = {
      ...postData,
      id: Date.now().toString()
    };
    this.posts.push(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await delay(350);
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    this.posts[index] = { ...this.posts[index], ...postData };
    return { ...this.posts[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    const deletedPost = this.posts.splice(index, 1)[0];
    return { ...deletedPost };
  }
}

export default new PostService();