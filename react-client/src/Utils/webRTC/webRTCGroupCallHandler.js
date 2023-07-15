let myPeer = null;

export const connectWithMyPeer = ()=>{
    myPeer = new window.Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '5000'
    });

    myPeer.on('open', (id)=>{
        console.log('Successfully connected with the peer service.', {id});
    });
};