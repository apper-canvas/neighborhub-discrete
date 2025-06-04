const { ApperClient } = window.ApperSDK

class UserService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async fetchAllUsers(params = {}) {
    try {
      const queryParams = {
        fields: ["Name", "email", "flat_number", "role", "profile_picture", "contact_visible", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"],
        ...params
      }
      const response = await this.apperClient.fetchRecords("User1", queryParams)
      return response?.data || []
    } catch (error) {
      console.error("Error fetching users:", error)
      throw error
    }
  }

  async getUserById(userId) {
    try {
      const params = {
        fields: ["Name", "email", "flat_number", "role", "profile_picture", "contact_visible", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"]
      }
      const response = await this.apperClient.getRecordById("User1", userId, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      throw error
    }
  }

  async createUser(userData) {
    try {
      const params = {
        records: [{
          Name: userData.Name,
          email: userData.email,
          flat_number: userData.flat_number,
          role: userData.role,
          profile_picture: userData.profile_picture,
          contact_visible: userData.contact_visible || false,
          Tags: userData.Tags || "",
          Owner: userData.Owner
        }]
      }
      const response = await this.apperClient.createRecord("User1", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  async updateUser(userId, userData) {
    try {
      const params = {
        records: [{
          Id: userId,
          Name: userData.Name,
          email: userData.email,
          flat_number: userData.flat_number,
          role: userData.role,
          profile_picture: userData.profile_picture,
          contact_visible: userData.contact_visible,
          Tags: userData.Tags,
          Owner: userData.Owner
        }]
      }
      const response = await this.apperClient.updateRecord("User1", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      const params = {
        RecordIds: [userId]
      }
      const response = await this.apperClient.deleteRecord("User1", params)
      return response?.success || false
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error)
      throw error
    }
  }
}

export default new UserService()