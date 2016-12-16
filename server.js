var socket = require('socket.io-client')('http://localhost:4000');

function rand(){
  return Math.floor((Math.random() * 100) + 1);
}

var timer = '';

socket.on('connect', function(){

  console.log("sunucuya baglandi");

  timer = setInterval(function(){

    var veriler = {panelId: '583fe76c9496e36605f923b9', akim: rand(), gerilim: rand(), light: rand(), sicaklik: rand(), nem: rand()};

    socket.compress(false).emit('verileriKaydetDagit', veriler);
    console.log("gonderdi");

  },600);
});

socket.on('event', function(data){

    console.log("event");
});

socket.on('disconnect', function(){

  clearInterval(timer);

  console.log("baglanti koptu");
});
