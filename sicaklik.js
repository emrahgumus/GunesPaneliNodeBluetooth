var util = require('util');

var async = require('async');

var SensorTag = require('./index');

var socket = require('socket.io-client')('http://localhost:4000');

var USE_READ = true;

socket.on('connect', function(){

  console.log("sunucuya baglandi");

});

SensorTag.discover(function(sensorTag) {
  console.log('discovered: ' + sensorTag);

  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connectAndSetUp');
        sensorTag.connectAndSetUp(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        sensorTag.readDeviceName(function(error, deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('readSystemId');
        sensorTag.readSystemId(function(error, systemId) {
          console.log('\tsystem id = ' + systemId);
          callback();
        });
      },
      function(callback) {
        console.log('readSerialNumber');
        sensorTag.readSerialNumber(function(error, serialNumber) {
          console.log('\tserial number = ' + serialNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readFirmwareRevision');
        sensorTag.readFirmwareRevision(function(error, firmwareRevision) {
          console.log('\tfirmware revision = ' + firmwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readHardwareRevision');
        sensorTag.readHardwareRevision(function(error, hardwareRevision) {
          console.log('\thardware revision = ' + hardwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readSoftwareRevision');
        sensorTag.readHardwareRevision(function(error, softwareRevision) {
          console.log('\tsoftware revision = ' + softwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readManufacturerName');
        sensorTag.readManufacturerName(function(error, manufacturerName) {
          console.log('\tmanufacturer name = ' + manufacturerName);
          callback();
        });
      },
      function(callback) {
        console.log('enableIrTemperature');
        sensorTag.enableIrTemperature(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {

    	  setInterval(function(){
            if (USE_READ) {
              console.log('readIrTemperature');
              sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
                console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
                console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1));


                var myJSONObject = {panel: data, akim: '10', gerilim:'15', sicaklik: objectTemperature.toFixed(1), nem: '40'};
                request({
                    url: "http://www.emrahgumus.com/GunesPaneli/veri_kaydet.php",
                    method: "POST",
                    json: true,
                    body: myJSONObject
                }, function (error, response, body){
                        console.log(body);
                });
/*
          	    var veriler = {panelId: '583fe76c9496e36605f923b9',
                                akim: objectTemperature.toFixed(1),
                                gerilim: '15',
                                sicaklik: '15',
                                nem: '15'
                              };

          	    socket.compress(false).emit('verileriKaydetDagit', veriler);
*/

                callback();
              });
            } else {
              sensorTag.on('irTemperatureChange', function(objectTemperature, ambientTemperature) {
                console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1));
                console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1))
              });

              console.log('setIrTemperaturePeriod');
              sensorTag.setIrTemperaturePeriod(500, function(error) {
                console.log('notifyIrTemperature');
                sensorTag.notifyIrTemperature(function(error) {
                  setTimeout(function() {
                    console.log('unnotifyIrTemperature');
                    sensorTag.unnotifyIrTemperature(callback);
                  }, 5000);
                });
              });
            }
    	    }, 500);
        }
      ]
  );
});
