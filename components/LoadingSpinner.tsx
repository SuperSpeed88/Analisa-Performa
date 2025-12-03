
import React from 'react';

interface LoadingSpinnerProps {
  large?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ large = false }) => {
  const sizeClasses = large ? 'w-10 h-10' : 'w-5 h-5';
  const borderClasses = large ? 'border-4' : 'border-2';

  return (
    <div className={`
      ${sizeClasses}
      ${borderClasses}
      border-t-transparent
      border-solid
      rounded-full
      animate-spin
      ${large ? 'border-indigo-500' : 'border-white'}
      mx-auto
    `}
    role="status"
    aria-label="loading"
    ></div>
  );
};

export default LoadingSpinner;
