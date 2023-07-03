import socketClient from 'socket.io-client';
import store from '../../redux/store';
import { setActiveUsers } from '../../redux/Dashboard/actions';
import { handleAnswer, handleCandidate, handleOffer, handlePreOffer, handlePreOfferAnswer, handleUserHangedUp } from '../webRTC/webRTCHandler';


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
};

const handleBroadcastEvents = (data)=>{
    switch(data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser=> activeUser.socketId !== socket.id);
            store.dispatch(setActiveUsers(activeUsers));
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