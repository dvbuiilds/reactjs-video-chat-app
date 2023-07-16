import { SET_ACTIVE_USERS, SET_GROUP_CALL_ROOMS, SET_USERNAME } from "./actions";

const initialState = {
    username: '',
    activeUsers: [],
    groupCallRooms: []
};

const dashboardReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case SET_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.activeUsers
            };
        case SET_GROUP_CALL_ROOMS:
            return {
                ...state,
                groupCallRooms: action.groupCallRooms
            };
        default:
            return state;
    }
};

export default dashboardReducer;