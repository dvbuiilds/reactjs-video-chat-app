import { SET_ACTIVE_USERS, SET_USERNAME } from "./actions";

const initialState = {
    username: '',
    activeUsers: []
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
            }
        default:
            return state;
    }
};

export default dashboardReducer;