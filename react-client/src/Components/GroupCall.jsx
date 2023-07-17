import React from 'react';
import { useSelector } from 'react-redux';
import GroupCallButton from './GroupCallButton';
import { createNewGroupCall } from '../Utils/webRTC/webRTCGroupCallHandler';

const GroupCall = () => {
    const { callState, localStream } = useSelector( state=> state.call );
    const createRoom = ()=>{
        createNewGroupCall();
    }
    return (
        <>
            <div className="row justify-content-start align-items-end">
                { localStream && callState !== 'CALL_IN_PROGRESS' && <GroupCallButton onClickHandler={createRoom} label={'Create Room'} /> }
            </div>
        </>
    )
}

export default GroupCall