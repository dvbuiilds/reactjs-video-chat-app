import React from 'react'
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';


const ActiveUsersList = (props) => {
    const activeUsers = props.activeUsers;
    return (
        <>
            <ul className="list-group">
                {
                    activeUsers.map(activeUser=> (
                        <li className="list-group-item" key={activeUser.socketId}><ActiveUsersListItem key={activeUser.socketId} activeUser={activeUser} /></li>
                    ))
                }
                {/* <li class="list-group-item"><ActiveUsersListItem/></li>
                <li class="list-group-item"><ActiveUsersListItem/></li>
                <li class="list-group-item"><ActiveUsersListItem/></li>
                <li class="list-group-item"><ActiveUsersListItem/></li> */}
            </ul>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {
        activeUsers: state.dashboard.activeUsers
    };
};

export default connect(mapStateToProps) (ActiveUsersList);