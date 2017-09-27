"use strict";

const Homey = require('homey');
const http = require("http.min");
const EventEmitter = require('events').EventEmitter;

var baseUrl = "https://my.eliq.io/api/";

class Eliq extends EventEmitter {

    /**
     * Toon constructor, provide the API key and secret.
     * @constructor
     */
    constructor(token) {
        super();

        this.meterPower = undefined;
        this.accessToken = undefined;
        this.token = undefined;
        this.startdate = undefined;
        this.intervaltype = undefined;

        this.accessToken = token;
    }

    getDataNow() {
        return http({
            uri: "https://my.eliq.io/api/datanow",
            json: true,
            query: {
                accesstoken: this.accessToken
            },
        });
    }

    getHistoricData() {
        return http({
            uri: "https://my.eliq.io/api/data",
            json: true,
            query: {
                accesstoken: this.accessToken,
                startdate: this.startdate,
                intervaltype: this.intervaltype
            },
        });
    }
}

module.exports = Eliq;