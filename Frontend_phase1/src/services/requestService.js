// Request service - handles all borrow request API calls
import api from './api';
import mockApiService from './mockApiService';

// Configuration: Use mock API when backend is not available
const USE_MOCK_API = true; // Set to false when backend is running

const requestService = {
  // Get all requests (filtered by user role automatically on backend)
  async getAllRequests(filters = {}) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) throw new Error('User not authenticated');
        
        return await mockApiService.getAllRequests(user.role, user.id, filters);
      } else {
        // Use real API
        const params = new URLSearchParams();
        
        // Add filters to query parameters
        if (filters.status) params.append('status', filters.status);
        if (filters.studentId) params.append('studentId', filters.studentId);
        if (filters.equipmentId) params.append('equipmentId', filters.equipmentId);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        
        const queryString = params.toString();
        const url = queryString ? `/requests?${queryString}` : '/requests';
        
        const response = await api.get(url);
        return response.success ? response.data : [];
      }
    } catch (error) {
      throw error;
    }
  },

  // Get single request by ID
  async getRequestById(id) {
    try {
      if (USE_MOCK_API) {
        // Mock functionality would go here
        throw new Error('Get request by ID not implemented in mock API yet');
      } else {
        // Use real API
        const response = await api.get(`/requests/${id}`);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Create new borrow request
  async createRequest(requestData) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) throw new Error('User not authenticated');
        
        return await mockApiService.createRequest(requestData, user.id);
      } else {
        // Use real API
        const response = await api.post('/requests', requestData);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Approve request (Staff/Admin only)
  async approveRequest(id) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.approveRequest(id);
      } else {
        // Use real API
        const response = await api.put(`/requests/${id}/approve`);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Reject request (Staff/Admin only)
  async rejectRequest(id, reason) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.rejectRequest(id, reason);
      } else {
        // Use real API
        const response = await api.put(`/requests/${id}/reject`, { reason });
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Issue equipment (Staff/Admin only)
  async issueEquipment(id) {
    try {
      if (USE_MOCK_API) {
        // Mock functionality would go here
        throw new Error('Issue equipment not implemented in mock API yet');
      } else {
        // Use real API
        const response = await api.put(`/requests/${id}/issue`);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Return equipment (Staff/Admin only)
  async returnEquipment(id, returnData) {
    try {
      if (USE_MOCK_API) {
        // Mock functionality would go here
        throw new Error('Return equipment not implemented in mock API yet');
      } else {
        // Use real API
        const response = await api.put(`/requests/${id}/return`, returnData);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Cancel request
  async cancelRequest(id) {
    try {
      if (USE_MOCK_API) {
        // Mock functionality would go here
        throw new Error('Cancel request not implemented in mock API yet');
      } else {
        // Use real API
        const response = await api.put(`/requests/${id}/cancel`);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Get overdue requests (Staff/Admin only)
  async getOverdueRequests() {
    try {
      if (USE_MOCK_API) {
        // Mock functionality would go here
        throw new Error('Overdue requests not implemented in mock API yet');
      } else {
        // Use real API
        const response = await api.get('/requests/overdue/list');
        return response.success ? response.data : [];
      }
    } catch (error) {
      throw error;
    }
  },

  // Get user's own requests (Students)
  async getMyRequests() {
    try {
      return await this.getAllRequests();
    } catch (error) {
      throw error;
    }
  },
};

export default requestService;