import React from 'react'
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera, } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { hangUp, switchForScreenSharingStream } from '../Utils/webRTC/webRTCHandler';

const ConversationButtons = (props) => {
    const { 
        localStream, 
        localCameraEnabled, 
        localMicrophoneEnabled, 
        setCameraEnabled, 
        setMicrophoneEnabled ,
        screenSharingActive
    } = props;

    const handleMicButtonPressed = ()=>{
        const micEnabled = localMicrophoneEnabled;
        localStream.getAudioTracks()[0].enabled = !micEnabled;
        setMicrophoneEnabled(!micEnabled);
    };

    const handleCameraButtonpressed = ()=> {
        const cameraEnabled = localCameraEnabled;
        localStream.getVideoTracks()[0].enabled = !cameraEnabled;
        setCameraEnabled(!cameraEnabled);
    };

    const handleScreenSharingBuuttonPressed = ()=>{
        switchForScreenSharingStream();
    };

    const handleHangUpButtonPressed = ()=>{
        hangUp();
    }

    const styles = {
        buttonContainer: {},
        icon: {
            width: '25px',
            height: '25px',
            fill: '#fff'
        }
    };
    return (
        <>
            <div className=''>
                <ConversationButton onClickHandler={ handleMicButtonPressed }>
                    { localMicrophoneEnabled? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} /> }
                </ConversationButton>
                <ConversationButton onClickHandler={ handleCameraButtonpressed }>
                    { localCameraEnabled?  <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} /> }
                </ConversationButton>
                <ConversationButton onClickHandler={ handleHangUpButtonPressed }>
                    <MdCallEnd style={styles.icon} />
                </ConversationButton>
                <ConversationButton onClickHandler={ handleScreenSharingBuuttonPressed }>
                    { screenSharingActive? <MdCamera style={styles.icon}/> : <MdVideoLabel style={styles.icon} /> } 
                </ConversationButton>
            </div>
        </>
    )
}

export default ConversationButtons