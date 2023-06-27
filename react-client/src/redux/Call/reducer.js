import { CALL_SET_CALLER_USERNAME, CALL_SET_CALLING_DIALOG_VISIBLE, CALL_SET_CALL_REJECTED, CALL_SET_CALL_STATE, CALL_SET_LOCAL_STREAM, callStates } from "./actions";


const initialState = {
    localStream: null,
    callState: callStates.CALL_UNAVAILABLE,
    callingDialogVisible: false,
    callerUsername: '',
    callRejected: {
        rejected: false,
        reason: ''
    },
};

const callReducer = (state=initialState, action)=>{
    switch(action.type){
        case CALL_SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.localStream
            };
            
        case CALL_SET_CALL_STATE:
            return {
                ...state,
                callState: action.callState
            };

        case CALL_SET_CALLING_DIALOG_VISIBLE:
            return {
                ...state,
                callingDialogVisible: action.visible
            };

        case CALL_SET_CALLER_USERNAME:
            return {
                ...state,
                callerUsername: action.callerUsername
            };

        case CALL_SET_CALL_REJECTED:
            return {
                ...state,
                callRejected: action.callRejected
            };
            
        default:
            return state;
    }
};

export default callReducer;