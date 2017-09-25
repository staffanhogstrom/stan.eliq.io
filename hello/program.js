var request = require('request-promise');

var eliq = {
    token: null,
    startdate: null,
    intervaltype: null,

    getDataNow: function () {
        return request({
            "method": "GET",
            "uri": "https://my.eliq.io/api/datanow",
            "json": true,
            qs: {
                accesstoken: this.token
            },
        });
    },

    getHistoricData: function () {
        return request({
            "method": "GET",
            "uri": "https://my.eliq.io/api/data",
            "json": true,
            qs: {
                accesstoken: this.token,
                startdate: this.startdate,
                intervaltype: this.intervaltype
            },
        });
    }
}


function main(params) {
    return new Promise((resolve, reject)=>{
        if (params.hasOwnProperty("token")) {
            eliq.token = params.token;
            eliq.startdate = "2017-09-24";
            eliq.intervaltype = "hour";
    
            resolve(eliq.getHistoricData());
            //return eliq.getDataNow();
            
        } else {
            reject('Invalid parameters');
            return;
        }
    })
}


main({ "token": process.argv[2] }).then(function (result) {
    console.log(result);
}).catch(function(){
    console.log('error');
})