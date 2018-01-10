var socket = io.connect('https://worldending-ggarl.c9users.io/',{reconnect:true}); /* glabal io $*/

socket.on('message', function(data) {
    console.log(data);
})