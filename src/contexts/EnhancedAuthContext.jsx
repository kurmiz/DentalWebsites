import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { API_CONFIG, apiRequest } from '../config/api';

const AuthContext = createContext();

// Enhanced auth state management
const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
        session: action.payload.session,
        error: null
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        session: null,
        loading: false,
        error: null
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
        tokens: null,
        session: null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    
    case 'REQUIRE_2FA':
      return {
        ...state,
        loading: false,
        requiresTwoFactor: true,
        tempUserId: action.payload.userId,
        error: null
      };
    
    case 'SESSION_EXPIRED':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        session: null,
        error: 'Your session has expired. Please log in again.'
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  session: null,
  loading: false,
  error: null,
  requiresTwoFactor: false,
  tempUserId: null
};

export const EnhancedAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Secure token storage
  const storeTokens = (tokens) => {
    if (tokens.accessToken) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('tokenExpiry', Date.now() + (15 * 60 * 1000)); // 15 minutes
    }
    if (tokens.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
  };

  const getStoredTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    return {
      accessToken,
      refreshToken,
      isExpired: tokenExpiry && Date.now() > parseInt(tokenExpiry)
    };
  };

  // Enhanced API request with automatic token refresh
  const authenticatedRequest = async (endpoint, options = {}) => {
    const tokens = getStoredTokens();
    
    // Check if token is expired and refresh if needed
    if (tokens.isExpired && tokens.refreshToken) {
      try {
        await refreshAccessToken();
      } catch (error) {
        dispatch({ type: 'SESSION_EXPIRED' });
        throw error;
      }
    }

    const config = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    try {
      return await apiRequest(endpoint, config);
    } catch (error) {
      if (error.message.includes('SESSION_EXPIRED')) {
        dispatch({ type: 'SESSION_EXPIRED' });
      }
      throw error;
    }
  };

  // Register function with enhanced validation
  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Client-side validation
      const validationErrors = validateRegistrationData(userData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  // Enhanced login function
  const login = async (email, password, twoFactorToken = null) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, twoFactorToken })
      });

      if (response.data.requiresTwoFactor) {
        dispatch({ 
          type: 'REQUIRE_2FA', 
          payload: { userId: response.data.userId } 
        });
        return response;
      }

      // Store tokens securely
      storeTokens(response.data);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          tokens: response.data,
          session: response.data.session
        }
      });

      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  // Logout function with session cleanup
  const logout = async () => {
    try {
      // Call backend logout to invalidate session
      await authenticatedRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await apiRequest('/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
      });

      storeTokens(response.data);
      return response.data;
    } catch (error) {
      clearTokens();
      dispatch({ type: 'SESSION_EXPIRED' });
      throw error;
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const response = await authenticatedRequest('/auth/me');
      dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      return response.data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  };

  // Validation functions
  const validateRegistrationData = (data) => {
    const errors = [];
    
    if (!data.firstName || data.firstName.length < 2) {
      errors.push('First name must be at least 2 characters');
    }
    
    if (!data.lastName || data.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters');
    }
    
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Valid email is required');
    }
    
    if (!data.password || data.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    
    if (data.password !== data.confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    return errors;
  };

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const tokens = getStoredTokens();
      
      if (tokens.accessToken && !tokens.isExpired) {
        try {
          const user = await getCurrentUser();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user,
              tokens: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
              session: null
            }
          });
        } catch (error) {
          clearTokens();
          dispatch({ type: 'LOGOUT' });
        }
      } else if (tokens.refreshToken) {
        try {
          await refreshAccessToken();
          const user = await getCurrentUser();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user,
              tokens: getStoredTokens(),
              session: null
            }
          });
        } catch (error) {
          clearTokens();
          dispatch({ type: 'LOGOUT' });
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (state.isAuthenticated) {
      const interval = setInterval(() => {
        const tokens = getStoredTokens();
        const timeUntilExpiry = parseInt(tokens.tokenExpiry) - Date.now();
        
        // Refresh token 5 minutes before expiry
        if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
          refreshAccessToken().catch(console.error);
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated]);

  const value = {
    ...state,
    register,
    login,
    logout,
    getCurrentUser,
    authenticatedRequest,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useEnhancedAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

export default EnhancedAuthProvider;
