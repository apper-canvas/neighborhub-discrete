const { ApperClient } = window.ApperSDK

class EventService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async fetchAllEvents(params = {}) {
    try {
      const queryParams = {
        fields: ["Name", "title", "description", "datetime", "location", "created_by", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"],
        orderBy: [{ fieldName: "datetime", SortType: "ASC" }],
        ...params
      }
      const response = await this.apperClient.fetchRecords("event", queryParams)
      return response?.data || []
    } catch (error) {
      console.error("Error fetching events:", error)
      throw error
    }
  }

  async getEventById(eventId) {
    try {
      const params = {
        fields: ["Name", "title", "description", "datetime", "location", "created_by", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"]
      }
      const response = await this.apperClient.getRecordById("event", eventId, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error)
      throw error
    }
  }

  async createEvent(eventData) {
    try {
      const params = {
        records: [{
          Name: eventData.Name || eventData.title || "New Event",
          title: eventData.title,
          description: eventData.description,
          datetime: eventData.datetime,
          location: eventData.location,
          created_by: eventData.created_by,
          Tags: eventData.Tags || "",
          Owner: eventData.Owner
        }]
      }
      const response = await this.apperClient.createRecord("event", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error("Error creating event:", error)
      throw error
    }
  }

  async updateEvent(eventId, eventData) {
    try {
      const params = {
        records: [{
          Id: eventId,
          Name: eventData.Name,
          title: eventData.title,
          description: eventData.description,
          datetime: eventData.datetime,
          location: eventData.location,
          created_by: eventData.created_by,
          Tags: eventData.Tags,
          Owner: eventData.Owner
        }]
      }
      const response = await this.apperClient.updateRecord("event", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error)
      throw error
    }
  }

  async deleteEvent(eventId) {
    try {
      const params = {
        RecordIds: [eventId]
      }
      const response = await this.apperClient.deleteRecord("event", params)
      return response?.success || false
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error)
      throw error
    }
  }
}

export default new EventService()