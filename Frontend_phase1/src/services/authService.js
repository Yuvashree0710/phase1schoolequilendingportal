// Authentication service - handles login, signup, and user management
import api from './api';
import mockApiService from './mockApiService';

// Configuration: Use mock API when backend is not available
const USE_MOCK_API = true; // Set to false when backend is running

// Store user data and token in localStorage
const storeUser = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', token);
};

// Get current user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data and token
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Check if user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Authentication API calls
const authService = {
  // Login user
  async login(username, password, role) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        const result = await mockApiService.login(username, password, role);
        storeUser(result.user, result.token);
        return result.user;
      } else {
        // Use real API
        const response = await api.post('/auth/login', {
          username,
          password,
          role
        });
        
        if (response.success) {
          storeUser(response.data.user, response.data.token);
          return response.data.user;
        } else {
          throw new Error(response.message || 'Login failed');
        }
      }
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        const result = await mockApiService.register(userData);
        storeUser(result.user, result.token);
        return result.user;
      } else {
        // Use real API
        const response = await api.post('/auth/register', userData);
        
        if (response.success) {
          storeUser(response.data.user, response.data.token);
          return response.data.user;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      }
    } catch (error) {
      throw error;
    }
  },

  // Request password reset
  async forgotPassword(email) {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        return await mockApiService.forgotPassword(email);
      } else {
        // Use real API
        const response = await api.post('/auth/forgot-password', { email });
        return response.message;
      }
    } catch (error) {
      throw error;
    }
  },

  // Get current user details
  async getCurrentUserDetails() {
    try {
      if (USE_MOCK_API) {
        // Use mock API
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const user = await mockApiService.getCurrentUser(token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        // Use real API
        const response = await api.get('/auth/me');
        if (response.success) {
          // Update stored user data
          localStorage.setItem('user', JSON.stringify(response.data.user));
          return response.data.user;
        }
      }
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout,
  
  // Get current user from storage
  getCurrentUser,
  
  // Check if authenticated
  isAuthenticated,
};

export default authService;