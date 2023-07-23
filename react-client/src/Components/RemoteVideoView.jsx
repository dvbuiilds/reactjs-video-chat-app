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
            <video style={style} ref={remoteVideoRef} autoPlay muted ></video>
        </>
    );
};

const style = {
    height: "200px",
    width: "300px",
    borderRadius: '15px'
};

export default RemoteVideoView;