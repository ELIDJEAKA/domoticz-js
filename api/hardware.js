'use strict';

var _ = require('underscore');

/** 
 * class Hardware
 *
 *  Copyright 2015 Tyneo Consulting.
 *
 *  This product includes software developed by
 *  Tyneo Consulting (http://tyneo.net).
 *
 *  Author: Samuel Kauffmann <skauffmann@tyneo.net>
 *
 **/

function Hardware(domoticz) {
    this.domoticz = domoticz;
}


/** section: hardware
 * Get all hardwares
 *  domoticz#getHardwares(callback) -> null
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=hardware
 **/
Hardware.prototype.getHardwares = function(callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "hardware");
    
    this.domoticz._request(url, callback);
};

/** section: hardware
 * Create virtual hardware
 *  domoticz#CreateVirtual(name, callback) -> null
 *      - name (String): Hardware name
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=addhardware&htype=15&port=1&name=Sensors1&enabled=true
 **/
Hardware.prototype.CreateVirtual = function(name, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", "addhardware");
    url.addSearch("htype", "15").addSearch("port", "1").addSearch("enabled", "true");
    url.addSearch("name", name);
    this.domoticz._request(url, callback);
};


module.exports = Hardware
