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
    } = props;
    return (
        <>
            <div className="row">
                { callState !== callStates.CALL_IN_PROGRESS && <DashboardInfo username={username} />}
                { callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog} /> }
                { callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} /> }
                { callingDialogVisible && <CallingDialog/> }
            </div>
            <div className="col-md-5">
                <LocalVideoView localStream={localStream}/>
            </div>
            <div className="col-md-7">
                { remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
            </div>
            <div className="row">
                { remoteStream && callState === 'CALL_IN_PROGRESS' && <ConversationButtons {...props} /> }
            </div>
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