const { ApperClient } = window.ApperSDK

class PostService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async fetchAllPosts(params = {}) {
    try {
      const queryParams = {
        fields: ["Name", "content", "category", "timestamp", "author_id", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"],
        orderBy: [{ fieldName: "timestamp", SortType: "DESC" }],
        ...params
      }
      const response = await this.apperClient.fetchRecords("post", queryParams)
      return response?.data || []
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  }

  async getPostById(postId) {
    try {
      const params = {
        fields: ["Name", "content", "category", "timestamp", "author_id", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"]
      }
      const response = await this.apperClient.getRecordById("post", postId, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error)
      throw error
    }
  }

  async createPost(postData) {
    try {
      const params = {
        records: [{
          Name: postData.Name || postData.content?.substring(0, 50) || "New Post",
          content: postData.content,
          category: postData.category || "general",
          timestamp: postData.timestamp || new Date().toISOString(),
          author_id: postData.author_id,
          Tags: postData.Tags || "",
          Owner: postData.Owner
        }]
      }
      const response = await this.apperClient.createRecord("post", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error("Error creating post:", error)
      throw error
    }
  }

  async updatePost(postId, postData) {
    try {
      const params = {
        records: [{
          Id: postId,
          Name: postData.Name,
          content: postData.content,
          category: postData.category,
          timestamp: postData.timestamp,
          author_id: postData.author_id,
          Tags: postData.Tags,
          Owner: postData.Owner
        }]
      }
      const response = await this.apperClient.updateRecord("post", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error)
      throw error
    }
  }

  async deletePost(postId) {
    try {
      const params = {
        RecordIds: [postId]
      }
      const response = await this.apperClient.deleteRecord("post", params)
      return response?.success || false
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error)
      throw error
    }
  }

  // Legacy methods for backward compatibility
  async getAll() {
    return this.fetchAllPosts()
  }

  async getById(id) {
    return this.getPostById(id)
  }

  async create(postData) {
    return this.createPost(postData)
  }

  async update(id, postData) {
    return this.updatePost(id, postData)
  }

  async delete(id) {
    return this.deletePost(id)
  }
}

export default new PostService()