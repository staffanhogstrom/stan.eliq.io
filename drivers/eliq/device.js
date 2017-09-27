'use strict';

const Homey = require('homey');
const Eliq = require('./eliq.js');

class EliqDevice extends Homey.Device {
    // this method is called when the Device is inited
    onInit() {
        this.log('device init');
        this.log('name:', this.getName());
        this.log('class:', this.getClass());

        // register a capability listener
        this.registerCapabilityListener('meter_power', this.onMeterPowerUpdated.bind(this));


        //Todo also set poll interval.
        const token = Homey.ManagerSettings.get('token');
        this.log('Token: ' + token);

        this.eliq = new Eliq(token);

        //last we start polling
        this.intervalId = setInterval(this.onPollingMethod.bind(this), 30000);
    }

    onPollingMethod() {
        this.log('onPollingMethod start');
        this.onMeterPower().catch(() => {
            //Todo: should we stop if we catch errors.
            this.log('error on pollingmethod');
        }).then(() => {
            //Success. Lets just continue.
            this.log('succes on onPollingMethod. Setting interval');
        });
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('device added');
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('device deleted');
        clearInterval(this.intervalId);
    }

    onMeterPowerUpdated() {
        this.log('onMeterPowerUpdated');
    }

    // this method is called when the Device has requested a state change (turned on or off)
    onMeterPower() {

        this.log('onMeterPower start');
        return new Promise((resolve, reject) => {
            this.eliq.getDataNow().then((result) => {
                //success so lets get data.

                this.log('Got data. Result.data.power:' + result.data.power);
                if (result.response.statusCode === 200 || result.response.statusCode === 201) {

                    let power = result.data.power;
                    this.setCapabilityValue('meter_power', power);

                    resolve();
                } else {
                    //Failed so recject
                    reject();
                }
            }).catch(() => {
                //Failed so reject
                reject();
            });
        });
    }
}

module.exports = EliqDevice;