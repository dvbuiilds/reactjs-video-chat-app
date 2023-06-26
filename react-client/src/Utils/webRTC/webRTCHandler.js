import { callStates, setCallState, setCallerUsername, setCallingDialogVisible, setLocalStream } from "../../redux/Call/actions";
import store from "../../redux/store";
import { sendPreOffer, sendPreOfferAnswer } from "../WssConnection/wssConnection";

const defaultConstraints = {
    video: true,
    audio: true
};

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(defaultConstraints)
    .then(stream => {
        store.dispatch(setLocalStream(stream));
        store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch(err => {
        console.log(err.message);
    });
};

let connectedUserSocketId = null;
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
};

export const rejectIncomingCallRequest = () => {
    resetCallData();
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    });
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
