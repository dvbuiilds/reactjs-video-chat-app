const createPeerServerListeners = (peerServer) => {
    peerServer.on('connection', (client)=>{
        console.log('Successfully connected with the peer js server. ', {id: client.id} );
    });
};

module.exports = {
    createPeerServerListeners
};