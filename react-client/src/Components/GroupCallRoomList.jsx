import React from 'react'
import GroupCallRoomListItem from './GroupCallRoomListItem';
import { useSelector } from 'react-redux';

// const dummyList = [
//     {
//         roomId: '123123',
//         hostName: 'Dhairya'
//     },
//     {
//         roomId: '321321',
//         hostName: 'Sugriva'
//     },
// ];

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