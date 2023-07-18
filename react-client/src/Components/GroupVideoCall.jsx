import React, { useEffect, useRef } from 'react'

const GroupVideoCall = ({ stream }) => {
    const videoRef = useRef();

    useEffect(()=>{
        const remoteGroupCallVideo = videoRef.current;
        remoteGroupCallVideo.srcObject = stream;
        remoteGroupCallVideo.onloadmetadata = ()=> remoteGroupCallVideo.play();
    }, [stream])
    return (
        <>
            <video ref={videoRef} style={style } autoPlay muted></video>
        </>
    );
};

const style = {
    height: "200px",
    width: "300px",
    borderRadius: '15px'
};

export default GroupVideoCall;