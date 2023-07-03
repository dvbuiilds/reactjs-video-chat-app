import React from 'react'
import { callToOtherUser } from '../Utils/webRTC/webRTCHandler';
import { callStates } from '../redux/Call/actions';

const ActiveUsersListItem = (props) => {
    const { activeUser, callState } = props;
    const handleListItemClick = ()=>{ 
        if(callState === callStates.CALL_AVAILABLE){
            callToOtherUser(activeUser);
        }
    };

    return (
        <>
            <div className='p-1 text-center' onClick={ handleListItemClick }>
                <div className='' style={{height: '70px', backgroundColor: 'green', width: 'auto', justifyContent: 'center'}}></div>
                <div className=''><span>{activeUser.username}</span></div>
            </div>
        </>
    )
}

export default ActiveUsersListItem