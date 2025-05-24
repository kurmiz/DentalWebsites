import React from 'react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

const QuickActions = ({ onAction }) => {
  const quickActions = [
    {
      icon: Calendar,
      text: 'Book Appointment',
      action: 'I want to book an appointment'
    },
    {
      icon: Clock,
      text: 'Clinic Hours',
      action: 'What are your clinic hours?'
    },
    {
      icon: MapPin,
      text: 'Location',
      action: 'Where is your clinic located?'
    },
    {
      icon: Phone,
      text: 'Emergency',
      action: 'I have a dental emergency'
    }
  ];

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick actions:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onAction(action.action)}
            className="flex items-center space-x-2 p-2 text-xs bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200"
          >
            <action.icon className="h-3 w-3 text-primary-600" />
            <span className="text-gray-700 dark:text-gray-300">{action.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
