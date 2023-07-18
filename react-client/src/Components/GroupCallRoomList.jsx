import React from 'react'
import GroupCallRoomListItem from './GroupCallRoomListItem';
import { useSelector } from 'react-redux';

const GroupCallRoomList = () => {
    const { groupCallRooms } = useSelector( state=> state.dashboard );
    return (
        <>
            <ul className="list-group list-group-horizontal">
                { groupCallRooms.map( room => <GroupCallRoomListItem key={room.roomId} room={room} /> ) }
            </ul>
        </>
    );
};

export default GroupCallRoomList;