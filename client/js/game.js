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
            console.log('a');
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

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
    context.clearRect(0,0,800,600);
    for(var index = 0; index < players.length; index++){
        context.beginPath();
        context.arc(players[index].x, players[index].y, 10, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();
    }
});