import React from 'react'
import { callToOtherUser } from '../Utils/webRTC/webRTCHandler';

const ActiveUsersListItem = (props) => {
    const { activeUser } = props;
    const handleListItemClick = ()=>{ 
        callToOtherUser(activeUser);
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