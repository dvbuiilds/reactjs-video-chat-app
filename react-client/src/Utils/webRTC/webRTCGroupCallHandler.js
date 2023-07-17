import store from "../../redux/store";
import { registerNewGroupCall } from "../WssConnection/wssConnection";

let myPeer = null, myPeerId = null;

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
};

export const createNewGroupCall = ()=>{
    registerNewGroupCall({
        username: store.getState().dashboard.username,
        peerId: myPeerId
    });
};