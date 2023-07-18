import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from './GroupCallButton';
import { createNewGroupCall, leaveGroupCall } from '../Utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from './GroupCallRoom';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../redux/Call/actions';

const GroupCall = (props) => {
    const { callState, localStream, groupCallActive, groupCallStreams } = props;

    const createRoom = ()=>{
        createNewGroupCall();
    };

    const leaveRoom = ()=>{
        leaveGroupCall();
    };

    return (
        <>
            <div className="row justify-content-start align-items-end">
                { !groupCallActive && localStream && callState !== 'CALL_IN_PROGRESS' && <GroupCallButton onClickHandler={ createRoom } label={'Create Room'} /> }
                <div className="row">
                    { groupCallActive && <GroupCallRoom {...props} /> }
                    { groupCallActive && <GroupCallButton onClickHandler={ leaveRoom } label={'Leave Room'} /> }
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {
        ...state.call
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        setCameraEnabled: enable => dispatch(setLocalCameraEnabled(enable)),
        setMicrophoneEnabled: enable => dispatch(setLocalMicrophoneEnabled(enable)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (GroupCall);