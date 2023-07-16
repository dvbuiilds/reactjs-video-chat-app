const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const PORT = process.env.PORT || 5000;
const { createPeerServerListeners } = require('./groupCallHandler');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

const peerServer = ExpressPeerServer( server, { debug: true } );
app.use('/peerjs', peerServer);
createPeerServerListeners(peerServer);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

let peers = [];
let groupCallRooms = [];

const broadcastEventTypes = {
    ACTIVE_USERS : 'ACTIVE_USERS',
    GROUP_CALL_ROOMS : 'GROUP_CALL_ROOMS'
};

io.on('connection', (socket)=>{
    socket.emit('connection', {message: 'MESSAGE: CONNECTION WITH BACKEND.'});
    
    socket.on('register-new-user', (data)=>{
        peers.push({
            username: data.username,
            socketId: data.socketId
        });
        console.log('New User registered.');
        console.log(peers);

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        });

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        }); 
    });

    socket.on('disconnect', ()=>{
        peers = peers.filter(peer => peer.socketId != socket.id);
        console.log('User disconnects, ', socket.id);
        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        });
    });

    socket.on('pre-offer', (data)=>{
        console.log('pre-offer handled');
        io.to(data.callee.socketId).emit('pre-offer', {
            callerUsername: data.caller.username,
            callerSocketId: socket.id
        })
    });

    socket.on('pre-offer-answer', (data)=>{
    console.log('handling pre offer answer');
        io.to(data.callerSocketId).emit('pre-offer-answer', {
            answer: data.answer,
        });
    });

    socket.on('webRTC-offer', (data)=>{
        console.log('handling web rtc offer');
        io.to(data.calleeSocketId).emit('webRTC-offer', {
            offer: data.offer
        });
    });

    socket.on('webRTC-answer', (data)=>{
        console.log('handling webrtc answer');
        io.to(data.callerSocketId).emit('webRTC-answer', {
            answer: data.answer
        });
    });

    socket.on('webRTC-candidate', (data)=>{
        console.log('handling ice candidate');
        io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
            candidate: data.candidate
        });
    });

    socket.on('user-hanged-up', (data)=>{
        console.log('handling user hanged up');
        io.to(data.connectedUserSocketId).emit('user-hanged-up');
    });

    // listeners related with group call.
    socket.on('group-call-register', (data)=>{
        const roomId = uuidv4();
        socket.join(roomId);

        const newGroupCallRoom = {
            peerId: data.peerId,
            hostName: data.username,
            socketId: socket.id,
            roomId: roomId
        };

        groupCallRooms.push(newGroupCallRoom);
        console.log(groupCallRooms);

        io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        });
    });
});

app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

server.listen(PORT, ()=>{
    console.log('Server is listening...');
});