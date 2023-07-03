import React from 'react'
import {connect} from 'react-redux';
import LocalVideoView from './LocalVideoView';
import RemoteVideoView from './RemoteVideoView';
import CallRejectedDialog from './CallRejectedDialog';
import IncomingCallDialog from './IncomingCallDialog';
import CallingDialog from './CallingDialog';
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../redux/Call/actions';
import ConversationButtons from './ConversationButtons';
import DashboardInfo from './DashboardInfo';

const DirectCall = (props) => {
    const { 
        username,
        localStream, 
        remoteStream, 
        callState, 
        callerUsername, 
        callingDialogVisible, 
        callRejected, 
        hideCallRejectedDialog,
        // localCameraEnabled,
        // localMicrophoneEnabled,
    } = props;
    return (
        <>
            <LocalVideoView localStream={localStream}/>
            { remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
            { callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog} /> }
            { callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} /> }
            { callingDialogVisible && <CallingDialog/> }
            { callState !== callStates.CALL_IN_PROGRESS && <DashboardInfo username={username} />}
            <ConversationButtons {...props} />
        </>
    );
};

const mapStateToProps = ({dashboard, call}) => {
    return {
        ...dashboard,
        ...call
    };
};

const mapDispatchToProps = (dispatch)=> {
    return {
        hideCallRejectedDialog: (callRejectedDetails)=> dispatch(setCallRejected(callRejectedDetails)),
        setCameraEnabled: (enabled)=> dispatch(setLocalCameraEnabled(enabled)),
        setMicrophoneEnabled: (enabled)=> dispatch(setLocalMicrophoneEnabled(enabled)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (DirectCall);