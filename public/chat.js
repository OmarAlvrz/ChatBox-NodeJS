// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Captura el evento del botón
btn.addEventListener('click', function(){
    emitChatEvent();
});

// Captura el evento de presionar Enter en el input de mensaje
message.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        emitChatEvent();
    }
});

// Función para emitir el evento 'chat'
function emitChatEvent() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
}


message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
