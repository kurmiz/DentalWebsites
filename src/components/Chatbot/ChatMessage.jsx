import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex items-start space-x-2 max-w-xs ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot 
            ? 'bg-gray-100 dark:bg-gray-700' 
            : 'bg-primary-600'
        }`}>
          {isBot ? (
            <Bot className="h-4 w-4 text-primary-600" />
          ) : (
            <User className="h-4 w-4 text-white" />
          )}
        </div>
        
        <div className={`rounded-lg p-3 ${
          isBot 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'bg-primary-600 text-white'
        }`}>
          <p className="text-sm whitespace-pre-line">{message.text}</p>
          <p className={`text-xs mt-1 ${
            isBot 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-blue-100'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
