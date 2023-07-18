import socketClient from 'socket.io-client';
import store from '../../redux/store';
import { setActiveUsers, setGroupCalls } from '../../redux/Dashboard/actions';
import { handleAnswer, handleCandidate, handleOffer, handlePreOffer, handlePreOfferAnswer, handleUserHangedUp } from '../webRTC/webRTCHandler';
import { checkActiveGroupCall, clearGroupData, connectToNewUser, removeInactiveStream } from '../webRTC/webRTCGroupCallHandler';


const URL = 'http://localhost:5000';
let socket;
const broadcastEventTypes = {
    ACTIVE_USERS : 'ACTIVE_USERS',
    GROUP_CALL_ROOMS : 'GROUP_CALL_ROOMS'
};

export const connectWithWebSocketServer = ()=>{
    socket = socketClient(URL);

    socket.on('connection', (data)=>{
        console.log('Connected with server. ', socket.id);
        console.log(data);
    });

    socket.on('broadcast', (data)=>{
        handleBroadcastEvents(data);
    });

    socket.on('pre-offer', (data)=>{
        handlePreOffer(data);
    });

    socket.on('pre-offer-answer', data=>{
        handlePreOfferAnswer(data);
    });

    socket.on('webRTC-offer', (data)=>{
        handleOffer(data);
    });

    socket.on('webRTC-answer', (data)=>{
        handleAnswer(data);
    });

    socket.on('webRTC-candidate', (data)=>{
        handleCandidate(data);
    });

    socket.on('user-hanged-up', ()=>{
        handleUserHangedUp();
    });

    // listeners related with group calls
    socket.on('group-call-join-request', (data)=>{
        connectToNewUser(data);
    });

    socket.on('group-call-user-left', (data)=>{
        removeInactiveStream(data);
    });
};

// Emitting events related with group calls.

export const registerNewGroupCall = (data)=>{
    socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data)=>{ 
    socket.emit('group-call-join-request', data);
};

export const userLeftGroupCall = (data)=>{
    socket.emit('group-call-user-left', data);
};

export const groupCallClosedByHost = (data)=>{
    socket.emit('group-call-closed-by-host', data);
};

// Emitting events related with socket.

const handleBroadcastEvents = (data)=>{
    switch(data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser=> activeUser.socketId !== socket.id);
            store.dispatch(setActiveUsers(activeUsers));
            break;
        case broadcastEventTypes.GROUP_CALL_ROOMS:
            const groupCallRooms = data.groupCallRooms.filter( room => room.socketId !== socket.id);
            const activeGroupCallRoomId = checkActiveGroupCall();
            if(activeGroupCallRoomId){
                const room = groupCallRooms.find( room => room.roomId === activeGroupCallRoomId );
                if(!room ){
                    clearGroupData();
                }
            }
            store.dispatch(setGroupCalls(groupCallRooms));
            break;
        default:
            break;
    };
};

export const registerNewUser = (username)=>{
    socket.emit('register-new-user', {
        username,
        socketId: socket.id
    });
};

export const sendPreOffer = (data)=>{
    socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data)=>{
    socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
    socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data)=> {
    socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data)=>{
    socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data)=>{
    socket.emit('user-hanged-up', data);
};