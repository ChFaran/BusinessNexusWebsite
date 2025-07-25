import React from 'react'
import classNames from 'classnames'

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white overflow-hidden shadow rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card