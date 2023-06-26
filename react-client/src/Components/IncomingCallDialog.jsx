import React from 'react'

const IncomingCallDialog = ({ callerUsername }) => {
    const handleAcceptButton = ()=>{ }
    const handleRejectButton = ()=>{ }
    const style = {
        height: "300px",
        width: "300px",
        backgroundColor: "brown",
        float: 'right'
    };
    return (
        <div style={style}>
            <span>{ callerUsername }</span>
            <div className="row">
                <button onClick={ handleAcceptButton } className='btn btn-primary'>Accept</button>
                <button onClick={ handleRejectButton } className='btn btn-danger'>Reject</button>
            </div>
        </div>
    )
}

export default IncomingCallDialog