import React from 'react'
import GroupCallRoomListItem from './GroupCallRoomListItem';

const dummyList = [
    {
        roomId: '123123',
        hostName: 'Dhairya'
    },
    {
        roomId: '321321',
        hostName: 'Sugriva'
    },
];

const GroupCallRoomList = () => {
    return (
        <>
            <ul className="list-group list-group-horizontal">
                { dummyList.map( room => <GroupCallRoomListItem key={room.roomId} room={room} /> ) }
            </ul>
        </>
    );
};

export default GroupCallRoomList;