import React from 'react'
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';


const ActiveUsersList = (props) => {
    const { activeUsers, callState } = props;
    return (
        <>
            <ul className="list-group">
                {
                    activeUsers.map(activeUser=> (
                        <li className="list-group-item" key={activeUser.socketId}><ActiveUsersListItem key={activeUser.socketId} activeUser={activeUser} callState={callState} /></li>
                    ))
                }
            </ul>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {
        activeUsers: state.dashboard.activeUsers,
        callState: state.call.callState,
    };
};

export default connect(mapStateToProps) (ActiveUsersList);