const { ApperClient } = window.ApperSDK

class ComplaintService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async fetchAllComplaints(params = {}) {
    try {
      const queryParams = {
        fields: ["Name", "category", "description", "status", "priority", "created_at", "resident_id", "assigned_to", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"],
        orderBy: [{ fieldName: "created_at", SortType: "DESC" }],
        ...params
      }
      const response = await this.apperClient.fetchRecords("complaint", queryParams)
      return response?.data || []
    } catch (error) {
      console.error("Error fetching complaints:", error)
      throw error
    }
  }

  async getComplaintById(complaintId) {
    try {
      const params = {
        fields: ["Name", "category", "description", "status", "priority", "created_at", "resident_id", "assigned_to", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"]
      }
      const response = await this.apperClient.getRecordById("complaint", complaintId, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching complaint ${complaintId}:`, error)
      throw error
    }
  }

  async createComplaint(complaintData) {
    try {
      const params = {
        records: [{
          Name: complaintData.Name || complaintData.description?.substring(0, 50) || "New Complaint",
          category: complaintData.category,
          description: complaintData.description,
          status: complaintData.status || "Open",
          priority: complaintData.priority || "Medium",
          created_at: complaintData.created_at || new Date().toISOString(),
          resident_id: complaintData.resident_id,
          assigned_to: complaintData.assigned_to,
          Tags: complaintData.Tags || "",
          Owner: complaintData.Owner
        }]
      }
      const response = await this.apperClient.createRecord("complaint", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error("Error creating complaint:", error)
      throw error
    }
  }

  async updateComplaint(complaintId, complaintData) {
    try {
      const params = {
        records: [{
          Id: complaintId,
          Name: complaintData.Name,
          category: complaintData.category,
          description: complaintData.description,
          status: complaintData.status,
          priority: complaintData.priority,
          created_at: complaintData.created_at,
          resident_id: complaintData.resident_id,
          assigned_to: complaintData.assigned_to,
          Tags: complaintData.Tags,
          Owner: complaintData.Owner
        }]
      }
      const response = await this.apperClient.updateRecord("complaint", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error(`Error updating complaint ${complaintId}:`, error)
      throw error
    }
  }

  async deleteComplaint(complaintId) {
    try {
      const params = {
        RecordIds: [complaintId]
      }
      const response = await this.apperClient.deleteRecord("complaint", params)
      return response?.success || false
    } catch (error) {
      console.error(`Error deleting complaint ${complaintId}:`, error)
      throw error
    }
  }
}

export default new ComplaintService()