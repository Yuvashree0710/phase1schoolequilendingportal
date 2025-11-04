// Equipment service - handles all equipment-related API calls
import api from './api';
import mockApiService from './mockApiService';

// Configuration: Use mock API when backend is not available
const USE_MOCK_API = true; // Set to false when backend is running

const equipmentService = {
  // Get all equipment with optional filters
  async getAllEquipment(filters = {}) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.getAllEquipment(filters);
      } else {
        // Use real API
        const params = new URLSearchParams();
        
        // Add filters to query parameters
        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);
        if (filters.availability) params.append('availability', filters.availability);
        if (filters.condition) params.append('condition', filters.condition);
        
        const queryString = params.toString();
        const url = queryString ? `/equipment?${queryString}` : '/equipment';
        
        const response = await api.get(url);
        return response.success ? response.data : [];
      }
    } catch (error) {
      throw error;
    }
  },

  // Get single equipment by ID
  async getEquipmentById(id) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.getEquipmentById(id);
      } else {
        // Use real API
        const response = await api.get(`/equipment/${id}`);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Create new equipment (Admin only)
  async createEquipment(equipmentData) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.createEquipment(equipmentData);
      } else {
        // Use real API
        const response = await api.post('/equipment', equipmentData);
        return response.success ? response.data : null;
      }
    } catch (error) {
      throw error;
    }
  },

  // Get equipment categories
  async getCategories() {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.getCategories();
      } else {
        // Use real API
        const response = await api.get('/equipment/categories/list');
        return response.success ? response.data : [];
      }
    } catch (error) {
      throw error;
    }
  },
};

export default equipmentService;