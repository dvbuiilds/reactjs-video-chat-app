import React from 'react'
import {connect} from 'react-redux';
import LocalVideoView from './LocalVideoView';
import RemoteVideoView from './RemoteVideoView';
import CallRejectedDialog from './CallRejectedDialog';
import IncomingCallDialog from './IncomingCallDialog';
import CallingDialog from './CallingDialog';
import { callStates, setCallRejected } from '../redux/Call/actions';

const DirectCall = (props) => {
    const { localStream, remoteStream, callState, callerUsername, callingDialogVisible, callRejected, hideCallRejectedDialog } = props;
    return (
        <>
        <LocalVideoView localStream={localStream}/>
        { remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
        { callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog} /> }
        { callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} /> }
        { callingDialogVisible && <CallingDialog/> }
        </>
    );
};

const mapStateToProps = ({call}) => {
    return {
        ...call
    };
};

const mapDispatchToProps = (dispatch)=> {
    return {
        hideCallRejectedDialog: (callRejectedDetails)=> dispatch(setCallRejected(callRejectedDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (DirectCall);