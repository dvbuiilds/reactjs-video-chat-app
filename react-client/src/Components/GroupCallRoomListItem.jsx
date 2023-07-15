import React from 'react'

const GroupCallRoomListItem = ({ room }) => {
    const handleListItemClicked = ()=>{ }
    return (
        <>
            <li className="list-group-item list-group-item-action" onClick={ handleListItemClicked }>
                {room.hostName}
            </li>
        </>
    );
};

export default GroupCallRoomListItem;