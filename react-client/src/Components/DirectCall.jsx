import React from 'react'
import {connect} from 'react-redux';
import LocalVideoView from './LocalVideoView';
import RemoteVideoView from './RemoteVideoView';
import CallRejectedDialog from './CallRejectedDialog';
import IncomingCallDialog from './IncomingCallDialog';
import CallingDialog from './CallingDialog';
import { callStates } from '../redux/Call/actions';

const DirectCall = (props) => {
    const { localStream, remoteStream, callState, callerUsername, callingDialogVisible } = props;
    return (
        <>
        <LocalVideoView localStream={localStream}/>
        { remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
        { <CallRejectedDialog/> }
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

export default connect(mapStateToProps) (DirectCall);