import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Server } from 'lucide-react';
import { API_CONFIG, API_ENDPOINTS, apiRequest } from '../config/api';

const BackendStatus = () => {
  const [status, setStatus] = useState({
    backend: 'checking',
    services: 'checking',
    lastChecked: null
  });

  const checkBackendStatus = async () => {
    try {
      // Check health endpoint
      const healthResponse = await apiRequest(API_ENDPOINTS.HEALTH);
      
      // Check services endpoint
      const servicesResponse = await apiRequest(API_ENDPOINTS.SERVICES.BASE);
      
      setStatus({
        backend: healthResponse.success ? 'online' : 'offline',
        services: servicesResponse.success ? 'online' : 'offline',
        lastChecked: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('Backend status check failed:', error);
      setStatus({
        backend: 'offline',
        services: 'offline',
        lastChecked: new Date().toLocaleTimeString()
      });
    }
  };

  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 'online':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'offline':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'checking':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className={`p-4 rounded-lg border-2 shadow-lg ${getStatusColor(status.backend)}`}>
        <div className="flex items-center space-x-3">
          <Server className="h-6 w-6" />
          <div>
            <div className="font-semibold text-sm">Backend Status</div>
            <div className="text-xs opacity-75">
              API: {API_CONFIG.BASE_URL}
            </div>
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>API Server:</span>
            <div className="flex items-center space-x-1">
              {getStatusIcon(status.backend)}
              <span className="capitalize">{status.backend}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Services:</span>
            <div className="flex items-center space-x-1">
              {getStatusIcon(status.services)}
              <span className="capitalize">{status.services}</span>
            </div>
          </div>
          
          {status.lastChecked && (
            <div className="text-xs opacity-75 pt-1 border-t">
              Last checked: {status.lastChecked}
            </div>
          )}
        </div>
        
        <button
          onClick={checkBackendStatus}
          className="mt-2 text-xs underline hover:no-underline"
        >
          Refresh Status
        </button>
      </div>
    </motion.div>
  );
};

export default BackendStatus;
