import React from 'react'
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../Utils/webRTC/webRTCHandler'

const IncomingCallDialog = ({ callerUsername }) => {
    const handleAcceptButton = ()=>{ 
        // console.log('Handling accept');
        acceptIncomingCallRequest();
    }
    const handleRejectButton = ()=>{ 
        // console.log('Handling reject');
        rejectIncomingCallRequest();
    }
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