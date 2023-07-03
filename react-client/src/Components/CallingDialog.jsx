import React from 'react'
import { hangUp } from '../Utils/webRTC/webRTCHandler';
import { MdCallEnd } from 'react-icons/md';

const CallingDialog = () => {
    const style = {
        height: "300px",
        width: "300px",
        backgroundColor: "brown",
        float: 'right'
    };
    
    const handleHangUpButtonPressed = ()=>{
        hangUp()
    };

    return (
        <div style={style}>
            <span>Calling</span>
            <button onClick={ handleHangUpButtonPressed } className='btn btn-lg btn-danger' >
                <MdCallEnd />
                End Call
            </button>
        </div>
    )
}

export default CallingDialog