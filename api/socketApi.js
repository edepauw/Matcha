const io = require( 'socket.io' )();
const socketapi = {
    io: io
};

var user = [];
var userIds = [];
const addUser = async (socket) =>
{

    var userObj = {
        socket: socket,
        id: null
    }
    user.push(userObj)
    userIds.push(socket.id)
}
const getSocketById = async (id) =>{
    var ret = null;
    user.forEach((elem) => {
        if(elem.id === id)
            ret = elem.socket
    })
    return ret;
}
const delUser = async (socket) =>
{
    var index = userIds.indexOf(socket.id)
    user.splice(index, 1)
    userIds.splice(index, 1)
}

const notifyMatch = async (id) =>{
    const socket = getSocketById(id);
    if(!socket)
        return
    socket.emit('match')
}

io.on( "connection", function( socket ) {
    console.log(socket.handshake);
    console.log( "A user connected" );
    addUser(socket);
    socket.on( "disconnect", function() {
        console.log( "A user disconnected" );
        delUser(socket);
    });
    socket.on( "msg", function( data ) {
        console.log( "Message received: " + data );
        io.emit( "msg", data );
    });
});
// end of socket.io logic

module.exports = socketapi;
