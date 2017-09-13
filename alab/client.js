'use strict';

// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://127.0.0.1:7001/lottery');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdWlkIjoiMTIzNDU2IiwiaWF0IjoxNTA1MTg0NzcyfQ.Mbb-Wu8kb1EUINhdrqBtgAcyvq67HzSdqt6tiAg7RMs'

socket.on('connect', () => {
    socket.emit('join', { token: token });


});
socket.on('join', msg => {
  console.log(msg)
    //socket.emit('234324', { token: token });
    //socket.emit('message', { data: 'this is my hat', token: token });
});



socket.on('message', msg => {
  console.log('res from server: %s!', msg);
});
