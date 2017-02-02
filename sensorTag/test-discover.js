var SensorTag = require('./index');

function onDiscover(sensorTag) {
  console.log('discovered: ' + sensorTag.id + ', type = ' + sensorTag.type);
}

// SensorTag.discoverAll(onDiscover);

 SensorTag.discoverById('b0b448bdb400', onDiscover);

// SensorTag.discoverByAddress('90:59:af:0a:ab:34', onDiscover);

//SensorTag.discover(onDiscover);
