const { ApperClient } = window.ApperSDK

class TransactionService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async fetchAllTransactions(params = {}) {
    try {
      const queryParams = {
        fields: ["Name", "amount", "type", "status", "due_date", "paid_date", "resident_id", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"],
        orderBy: [{ fieldName: "due_date", SortType: "DESC" }],
        ...params
      }
      const response = await this.apperClient.fetchRecords("transaction", queryParams)
      return response?.data || []
    } catch (error) {
      console.error("Error fetching transactions:", error)
      throw error
    }
  }

  async getTransactionById(transactionId) {
    try {
      const params = {
        fields: ["Name", "amount", "type", "status", "due_date", "paid_date", "resident_id", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"]
      }
      const response = await this.apperClient.getRecordById("transaction", transactionId, params)
      return response?.data || null
    } catch (error) {
      console.error(`Error fetching transaction ${transactionId}:`, error)
      throw error
    }
  }

  async createTransaction(transactionData) {
    try {
      const params = {
        records: [{
          Name: transactionData.Name || `${transactionData.type} - ${transactionData.amount}` || "New Transaction",
          amount: parseFloat(transactionData.amount),
          type: transactionData.type,
          status: transactionData.status || "Pending",
          due_date: transactionData.due_date,
          paid_date: transactionData.paid_date || null,
          resident_id: transactionData.resident_id,
          Tags: transactionData.Tags || "",
          Owner: transactionData.Owner
        }]
      }
      const response = await this.apperClient.createRecord("transaction", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error("Error creating transaction:", error)
      throw error
    }
  }

  async updateTransaction(transactionId, transactionData) {
    try {
      const params = {
        records: [{
          Id: transactionId,
          Name: transactionData.Name,
          amount: parseFloat(transactionData.amount),
          type: transactionData.type,
          status: transactionData.status,
          due_date: transactionData.due_date,
          paid_date: transactionData.paid_date,
          resident_id: transactionData.resident_id,
          Tags: transactionData.Tags,
          Owner: transactionData.Owner
        }]
      }
      const response = await this.apperClient.updateRecord("transaction", params)
      return response?.results?.[0]?.data || null
    } catch (error) {
      console.error(`Error updating transaction ${transactionId}:`, error)
      throw error
    }
  }

  async deleteTransaction(transactionId) {
    try {
      const params = {
        RecordIds: [transactionId]
      }
      const response = await this.apperClient.deleteRecord("transaction", params)
      return response?.success || false
    } catch (error) {
      console.error(`Error deleting transaction ${transactionId}:`, error)
      throw error
    }
  }
}

export default new TransactionService()