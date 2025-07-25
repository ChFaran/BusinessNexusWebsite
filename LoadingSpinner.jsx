import React from 'react'

const LoadingSpinner = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  )
}

export default LoadingSpinner