import React from 'react'

const DashboardInfo = ({ username }) => {
    return (
        <>
        <div style={{fontSize: "20px"}}>
            <span className=''>Hello {username}! Welcome to the dashboard.</span>
            <span className=''>You can start a call by directly clicking on list item in right hand side.</span>
        </div>
        </>
    )
}

export default DashboardInfo