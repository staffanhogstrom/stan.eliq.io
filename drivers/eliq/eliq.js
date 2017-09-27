'use strict';

const http = require('http.min');
const EventEmitter = require('events').EventEmitter;

const baseUrl = 'https://my.eliq.io/api/';

class Eliq extends EventEmitter {

    /**
     * Eliq constructor, provide the API token
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
            uri: baseUrl + 'datanow',
            json: true,
            query: {
                accesstoken: this.accessToken
            },
        });
    }

    getHistoricData() {
        return http({
            uri: baseUrl + 'data',
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