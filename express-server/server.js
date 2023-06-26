const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

let peers = [];
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
});

app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

server.listen(PORT, ()=>{
    console.log('Server is listening...');
});