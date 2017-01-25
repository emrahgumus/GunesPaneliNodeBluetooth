var socket = require('socket.io-client')('http://localhost:4000');
var ip = require("ip");


var d_akim = 17;
var d_geri = 17;
var d_sica = 17;
var d_nem  = 17;


function ipAddrUpdate(){

  var ip_address = ip.address();

  socket.compress(false).emit('ipAdresiGuncelle', {
    macAddr : "40:50:60",
    ipAddr  : ip_address
  });

  console.log("ip adresleri guncellendi.");
}


function rand(sayi){
  if(sayi > 100) return 100;
  if(sayi < -100) return -100;

  if(Math.floor((Math.random() * 10))%2 == 1){
    return sayi + (Math.floor((Math.random() * 10))%2);
  }else
    return sayi - (Math.floor((Math.random() * 10))%2);
}

var timer = '';

socket.on('connect', function(){

  console.log("sunucuya baglandi");

  ipAddrUpdate();


  timer = setInterval(function(){
    var veriler = {
      macAddr:  '40:50:60',
      akim:     d_akim = rand(d_akim),
      gerilim:  d_geri = rand(d_geri),
      sicaklik: d_sica = rand(d_sica),
      nem:      d_nem = rand(d_nem),
      secKey:   d_akim+''+d_geri+''+d_sica+''+d_nem,
     };
    socket.compress(false).emit('verileriKaydetDagit', veriler);






    console.log("gonderdi");
  },600);


});

/*
socket.on('event', function(data){
    console.log("event");
});
*/

socket.on('disconnect', function(){

  clearInterval(timer);
  console.log("baglanti koptu");
});
