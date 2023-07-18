import { callStates, clearGroupCallData, setCallState, setGroupCallActive, setGroupCallIncomingStreams } from "../../redux/Call/actions";
import store from "../../redux/store";
import { groupCallClosedByHost, registerNewGroupCall, userLeftGroupCall, userWantsToJoinGroupCall } from "../WssConnection/wssConnection";

let myPeer = null, myPeerId = null, groupCallRoomId = null, groupCallHost= false;
 
export const connectWithMyPeer = ()=>{
    myPeer = new window.Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '5000'
    });

    myPeer.on('open', (id)=>{
        myPeerId = id;
        console.log('Successfully connected with the peer service.', {id});
    });

    myPeer.on('call', (call) => {
        call.answer(store.getState().call.localStream);
        call.on('stream', (incomingStream)=> {
            // console.log('stream came');
            // console.log({incomingStream});
            const streams = store.getState().call.groupCallStreams;
            const stream = streams.find( stream => stream.id === incomingStream.id);

            if(!stream){
                addVideoStream(incomingStream);
            }
        });
    });
};

export const createNewGroupCall = ()=>{
    groupCallHost = true;
    registerNewGroupCall({
        username: store.getState().dashboard.username,
        peerId: myPeerId
    });

    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const joinGroupCall = (hostSocketId, roomId )=>{
    const localStream = store.getState().call.localStream;
    groupCallRoomId = roomId;
    userWantsToJoinGroupCall({
        peerId: myPeerId,
        hostSocketId,
        roomId,
        localStreamId: localStream.id
    });

    store.dispatch(setGroupCallActive(true));
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));   
};

export const connectToNewUser = (data)=>{
    const localStream = store.getState().call.localStream;
    const call = myPeer.call(data.peerId, localStream);

    call.on('stream', (incomingStream) => {
        // console.log('stream came');
        const streams = store.getState().call.groupCallStreams;
        const stream = streams.find( stream => stream.id === incomingStream.id);

        if(!stream){
            addVideoStream(incomingStream);
        }
    });
};

export const leaveGroupCall = ()=>{
    if(groupCallHost){
        groupCallClosedByHost({
            peerId: myPeerId
        });
    } else{
        userLeftGroupCall({
            streamId: store.getState().call.localStream.id,
            roomId: groupCallRoomId,
        });
    }

    clearGroupData();
};

export const clearGroupData = ()=>{
    groupCallRoomId = null;
    groupCallHost = false;
    store.dispatch(clearGroupCallData());
    myPeer.destroy();
    connectWithMyPeer();

    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;
};

export const removeInactiveStream = (data)=> {
    const groupCallStreams = store.getState().call.groupCallStreams.filter( stream => stream.id !== data.streamId );
    store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
}

export const addVideoStream = (incomingStream)=>{
    const groupCallStreams = [
        ...store.getState().call.groupCallStreams,
        incomingStream
    ];

    store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

// If group call is active, then return room id. otherwise return false.
export const checkActiveGroupCall = ()=>{
    if(store.getState().call.groupCallActive){
        return groupCallRoomId;
    }
    return false;
};