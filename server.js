var socket = require('socket.io-client')('https://yapbenzet.com:4000');

var d_akim = 17;
var d_geri = 17;
var d_sica = 17;
var d_nem  = 17;
var d_ligh = 17;

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
      panelId: '588766cb9398c243182ff337',
      akim: d_akim = rand(d_akim),
      gerilim: d_geri = rand(d_geri),
      light: d_ligh = rand(d_ligh),
      sicaklik: d_sica = rand(d_sica),
      nem: d_nem = rand(d_nem)
     };
    socket.compress(false).emit('verileriKaydetDagit', veriler);

    var veriler = {panelId: '584916dfcae05eaf031cda5e', akim: d_akim = rand(d_akim), gerilim: d_geri = rand(d_geri), light: d_ligh = rand(d_ligh), sicaklik: d_sica = rand(d_sica), nem: d_nem = rand(d_nem)};
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
