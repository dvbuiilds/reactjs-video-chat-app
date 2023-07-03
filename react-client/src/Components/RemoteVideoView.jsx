import React, { useEffect, useRef } from 'react'

const RemoteVideoView = (props) => {
    const { remoteStream } = props;
    const remoteVideoRef = useRef();
    useEffect(()=>{
        if(remoteStream){
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadmetadata = ()=> {
                remoteVideo.play();
            }
        }
    }, [remoteStream]);
    return (
        <>
            <video ref={remoteVideoRef} autoPlay muted ></video>
        </>
    );
};

export default RemoteVideoView;