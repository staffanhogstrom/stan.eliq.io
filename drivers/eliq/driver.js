'use strict';

const Homey = require('homey');

class EliqDriver extends Homey.Driver {

    onInit() {
        this.log('inside onInit');

        //this.getDevices().map(device => {
        //Should we do something with the devices? Dont know.
        //});
    }

    onPair(item) {
        this.log('Eliq app. onPair: ' + item);
    }

    onPairListDevices() {
        this.log('Eliq app. onPairListDevices: ');
    }
}


module.exports = EliqDriver;