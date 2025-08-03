import React from 'react'

function RateLimitedUI() {
  return (
    <div className='max-w-6xl mx-auto py-8'>
      <p className="text-base-content mb-1">
        You've made too many requests in a short period. Please try again after few moments.
      </p>
    </div>
  )
}

export default RateLimitedUI
