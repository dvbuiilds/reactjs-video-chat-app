import React, { useEffect } from 'react'

const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {
  useEffect(()=>{
    setTimeout(()=>{
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      })
    }, 4000)
  }); 
  
  return (
    <div>
        <p>Rejected</p>
        <span className='text-muted'>{reason}</span>
    </div>
  )
}

export default CallRejectedDialog