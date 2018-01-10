var socket = io.connect('https://worldending-ggarl.c9users.io/',{reconnect:true}); /* glabal io $*/

socket.on('message', function(data) {
    console.log(data);
})



var movement = {
    up:false,
    down:false,
    left:false,
    right:false
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 65: //a
            movement.left = true;
            break;
        case 87: //w
            movement.up = true;
            break;
        case 68: //d
            movement.right = true;
            break;
        case 83: //s
            movement.down = true;
            break;
    }
});

document.addEventListener('keyup', function(event){
    switch(event.keyCode) {
        case 65: //a
            movement.left = false;
            break;
        case 87: //w
            movement.up = false;
            break;
        case 68: //d
            movement.right = false;
            break;
        case 83: //s
            movement.down = false;
            break;
    }
});

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
}, 1000/60);