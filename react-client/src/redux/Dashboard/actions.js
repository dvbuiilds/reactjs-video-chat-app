export const SET_USERNAME = 'SET_USERNAME';
export const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';

export const setUserName = (username)=>{
    return {
        type: SET_USERNAME,
        username
    };
};

export const setActiveUsers = (activeUsers) =>{
    return {
        type: SET_ACTIVE_USERS,
        activeUsers
    };
};