// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5001/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    REFRESH_TOKEN: '/auth/refresh-token'
  },
  
  // User Management
  USERS: {
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE_ACCOUNT: '/users/account'
  },
  
  // Appointments
  APPOINTMENTS: {
    BASE: '/appointments',
    MY_APPOINTMENTS: '/appointments/my-appointments',
    AVAILABLE_SLOTS: '/appointments/available-slots'
  },
  
  // Services
  SERVICES: {
    BASE: '/services'
  },
  
  // Contact
  CONTACT: {
    BASE: '/contact'
  },
  
  // Health Check
  HEALTH: '/health'
};

// API Helper Functions
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {
    ...API_CONFIG.HEADERS,
    'Authorization': `Bearer ${token}`
  } : API_CONFIG.HEADERS;
};

export const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API Request Helper
export const apiRequest = async (endpoint, options = {}) => {
  const url = buildUrl(endpoint);
  const config = {
    timeout: API_CONFIG.TIMEOUT,
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default API_CONFIG;
