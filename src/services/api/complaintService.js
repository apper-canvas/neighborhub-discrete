import complaintData from '../mockData/complaint.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ComplaintService {
  constructor() {
    this.complaints = [...complaintData];
  }

  async getAll() {
    await delay(320);
    return [...this.complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await delay(250);
    const complaint = this.complaints.find(c => c.id === id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    return { ...complaint };
  }

  async create(complaintData) {
    await delay(400);
    const newComplaint = {
      ...complaintData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'Open'
    };
    this.complaints.push(newComplaint);
    return { ...newComplaint };
  }

  async update(id, complaintData) {
    await delay(350);
    const index = this.complaints.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Complaint not found');
    }
    this.complaints[index] = { ...this.complaints[index], ...complaintData };
    return { ...this.complaints[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.complaints.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Complaint not found');
    }
    const deletedComplaint = this.complaints.splice(index, 1)[0];
    return { ...deletedComplaint };
  }
}

export default new ComplaintService();