import React, { useEffect, useRef } from 'react'

const LocalVideoView = (props) => {
    const { localStream } = props;
    const localVideoRef = useRef();
    useEffect(()=>{
        if(localStream){
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadmetadata = ()=> {
                localVideo.play();
            }
        }
    }, [localStream]);
    return (
        <>
            <video style={style} ref={localVideoRef} autoPlay muted ></video>
        </>
    );
};

const style = {
    height: "200px",
    width: "300px",
    borderRadius: '15px'
};

export default LocalVideoView