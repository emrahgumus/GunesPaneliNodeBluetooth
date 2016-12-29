var socket = require('socket.io-client')('http://localhost:4000');

var d_akim = 50;
var d_geri = 40;
var d_sica = 30;
var d_nem  = 20;
var d_ligh = 10;

function rand(sayi){

  if(sayi > 100) return 100;
  if(sayi < -100) return -100;

  if(Math.floor((Math.random() * 10))%2 == 1){
    return sayi + (Math.floor((Math.random() * 10))%2);
  }else
    return sayi - (Math.floor((Math.random() * 10))%2);


  //return Math.floor((Math.random() * 100) + 1);
}

var timer = '';

socket.on('connect', function(){

  console.log("sunucuya baglandi");

  timer = setInterval(function(){

    var veriler = {
      panelId: '583fe76c9496e36605f923b9',
      akim: d_akim = rand(d_akim),
      gerilim: d_geri = rand(d_geri),
      light: d_ligh = rand(d_ligh),
      sicaklik: d_sica = rand(d_sica),
      nem: d_nem = rand(d_nem)
     };
    socket.compress(false).emit('verileriKaydetDagit', veriler);

    var veriler = {panelId: '583fe7759496e36605f923ba', akim: d_akim = rand(d_akim), gerilim: d_geri = rand(d_geri), light: d_ligh = rand(d_ligh), sicaklik: d_sica = rand(d_sica), nem: d_nem = rand(d_nem)};
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
