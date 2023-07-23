import React from 'react'
import { joinGroupCall } from '../Utils/webRTC/webRTCGroupCallHandler';

const GroupCallRoomListItem = ({ room }) => {
    const handleListItemClicked = ()=>{ 
        joinGroupCall(room.socketId,  room.roomId);
    }
    return (
        <>
            <li className="list-group-item list-group-item-action" onClick={ handleListItemClicked }>
                {room.hostName}
            </li>
        </>
    );
};

export default GroupCallRoomListItem;