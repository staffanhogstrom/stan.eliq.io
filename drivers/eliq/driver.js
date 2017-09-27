"use strict";

const Homey = require('homey');
const http = require("http");


class EliqDriver extends Homey.Driver {

    onInit() {
        var baseUrl = "https://my.eliq.io/api/";


        this.log('inside onInit');

        this.getDevices().map(device => {
        })
    }

    onPair(item) {
        this.log("Eliq app. onPair: " + item)
    }

    onPairListDevices(state, data, callback) {
        this.log("Eliq app. onPairListDevices: " + item)
    }
}


module.exports = EliqDriver;