
import React from 'react';
import { ExclamationTriangleIcon } from './icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center"
      role="alert"
    >
      <ExclamationTriangleIcon className="w-6 h-6 mr-3 text-red-500" />
      <div>
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
