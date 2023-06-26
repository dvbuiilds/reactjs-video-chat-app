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
            <div>
                <video ref={remoteVideoRef} autoPlay muted ></video>
            </div>
        </>
    );
};

export default RemoteVideoView;