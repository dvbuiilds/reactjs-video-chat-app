import { callStates, setCallRejected, setCallState, setCallerUsername, setCallingDialogVisible, setLocalStream, setRemoteStream } from "../../redux/Call/actions";
import store from "../../redux/store";
import { sendPreOffer, sendPreOfferAnswer, sendWebRTCAnswer, sendWebRTCCandidate, sendWebRTCOffer } from "../WssConnection/wssConnection";

const defaultConstraints = {
    video: true,
    audio: true
};

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(defaultConstraints)
    .then(stream => {
        store.dispatch(setLocalStream(stream));
        store.dispatch(setCallState(callStates.CALL_AVAILABLE));
        createPeerConnection();
    })
    .catch(err => {
        console.log(err.message);
    });
};

let connectedUserSocketId = null, peerConnection = null;
const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:13902'
    }]
};

export const createPeerConnection = ()=>{
    peerConnection = new RTCPeerConnection(configuration);
    const localStream = store.getState().call.localStream;

    for(let track of localStream.getTracks()){
        peerConnection.addTrack(track, localStream);
    }

    peerConnection.ontrack = ({ streams: [stream] })=>{
        // dispatch remote stream in our store.
        store.dispatch(setRemoteStream(stream));
    };

    peerConnection.onicecandidate = (event)=> {
        console.log('getting candidates from stun server', {event});
        // send our ice candidate to connected user.
        if(event.candidate){
            sendWebRTCCandidate({
                candidate: event.candidate,
                connectedUserSocketId: connectedUserSocketId
            });
            console.log('Sending web rtc candidate');
        }
    };

    peerConnection.onconnectionstatechange = (event)=>{
        if(peerConnection.connectionState === 'connected'){
            console.log('successfully connected with other peer.    ');
        }
    };
}

export const callToOtherUser = (calleeDetails)=> {
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));
    sendPreOffer({
        callee: calleeDetails,
        caller: {
            username: store.getState().dashboard.username,
        }
    });
};

export const handlePreOffer = (data)=>{
    if(checkIfCallIsPossible()){
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername));
        store.dispatch(setCallState(callStates.CALL_REQUESTED));
    } else{
        sendPreOfferAnswer({
            callerSocketId: data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        });
    }
};

export const handlePreOfferAnswer = data=>{
    store.dispatch(setCallingDialogVisible(false));
    if(data.answer === preOfferAnswers.CALL_ACCEPTED){
        // send WebRTC offer to other User.
        sendOffer();
    } else{
        let rejectReason;
        if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE){
            rejectReason = 'Callee is not available right now.';
        } else{
            rejectReason = 'Call is rejected by the callee';
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectReason
        }));
        resetCallData();
    }
};

export const handleOffer = async (data)=>{
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendWebRTCAnswer({
        callerSocketId: connectedUserSocketId,
        answer
    });
};

export const handleAnswer = async(data)=>{
    await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async(data)=>{
    try{
        await peerConnection.addIceCandidate(data.candidate)
        .then(()=> console.log('adding ice candidate', data))
        .catch((err)=> console.log(err.message));
        
    } catch(error){
        console.error('Error: trying to add recieved ice candidate');
        console.log(error.message);
    }
};

export const sendOffer = async ()=>{
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer,
    });
};

export const preOfferAnswers = {
    CALL_ACCEPTED : 'CALL_ACCEPTED',
    CALL_REJECTED : 'CALL_REJECTED',
    CALL_NOT_AVAILABLE : 'CALL_NOT_AVAILABLE',
};

export const acceptIncomingCallRequest = ()=>{
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    });
    
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    });
    resetCallData();
};

export const checkIfCallIsPossible = () => {
    if(
        store.getState().call.localStream === null || 
        store.getState().call.callState !== callStates.CALL_AVAILABLE
    ){
        return false;
    } else{
        return true;
    }
};

export const resetCallData = ()=> {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
