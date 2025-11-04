// User service - handles user management API calls
import api from './api';

const userService = {
  // Get all users (Admin only)
  async getAllUsers(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      // Add filters to query parameters
      if (filters.role) params.append('role', filters.role);
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);
      
      const queryString = params.toString();
      const url = queryString ? `/users?${queryString}` : '/users';
      
      const response = await api.get(url);
      return response.success ? response.data : [];
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID (Admin only)
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.success ? response.data : null;
    } catch (error) {
      throw error;
    }
  },

  // Update user (Admin only)
  async updateUser(id, updateData) {
    try {
      const response = await api.put(`/users/${id}`, updateData);
      return response.success ? response.data : null;
    } catch (error) {
      throw error;
    }
  },

  // Delete user (Admin only)
  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.success;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;