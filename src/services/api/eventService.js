import eventData from '../mockData/event.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EventService {
  constructor() {
    this.events = [...eventData];
  }

  async getAll() {
    await delay(300);
    return [...this.events].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }

  async getById(id) {
    await delay(250);
    const event = this.events.find(e => e.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    return { ...event };
  }

  async create(eventData) {
    await delay(450);
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      rsvps: []
    };
    this.events.push(newEvent);
    return { ...newEvent };
  }

  async update(id, eventData) {
    await delay(350);
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    this.events[index] = { ...this.events[index], ...eventData };
    return { ...this.events[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    const deletedEvent = this.events.splice(index, 1)[0];
    return { ...deletedEvent };
  }
}

export default new EventService();