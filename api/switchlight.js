'use strict';

/**
 * class SwitchLight
 *
 *  Copyright 2015 Tyneo Consulting.
 *
 *  This product includes software developed by
 *  Tyneo Consulting (http://tyneo.net).
 *
 *  Author: Samuel Kauffmann <skauffmann@tyneo.net>
 *
 **/

function SwitchLight(domoticz) {
    this.domoticz = domoticz;
}

/** section: switchlight
 *  Turn a light or switch on
 *  domoticz#turnOn(idx, callback) -> null
 *      - idx (Integer): id of your device (This number can be found in the devices tab in the column "IDX")
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=switchlight&idx=99&switchcmd=On
 **/
SwitchLight.prototype.turnOn = function(idx, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", 'switchlight');
    url.addSearch("idx", idx);
    url.addSearch("switchcmd", "On");
    this.domoticz._request(url, callback);
};

/** section: switchlight
 *  Turn a light or switch off
 *  domoticz#turnOn(idx, callback) -> null
 *      - idx (Integer): id of your device (This number can be found in the devices tab in the column "IDX")
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=switchlight&idx=99&switchcmd=Off
 **/
SwitchLight.prototype.turnOff = function(idx, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", 'switchlight');
    url.addSearch("idx", idx);
    url.addSearch("switchcmd", "Off");
    this.domoticz._request(url, callback);
};

/** section: switchlight
 *  Set a dimmable light to a certain level
 *  domoticz#setLevel(idx, level, callback) -> null
 *      - idx (Integer): id of your device (This number can be found in the devices tab in the column "IDX")
 *      - level (Integer): Level should be a value between 1 (0%) and 16 (100%). Though in some cases you need to use the percentage, so if 1 to 16 doesn't work for you , then try 1 to 100 (without the percentage symbol)
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=switchlight&idx=99&switchcmd=Set%20Level&level=6
 **/
SwitchLight.prototype.setLevel = function(idx, level, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", 'switchlight');
    url.addSearch("idx", idx);
    url.addSearch("switchcmd", "Set Level");
    url.addSearch("level", level);
    this.domoticz._request(url, callback);
};

/** section: switchlight
 *  Toggle a switch state between on/off
 *  domoticz#setLevel(idx, callback) -> null
 *      - idx (Integer): id of your device (This number can be found in the devices tab in the column "IDX")
 *      - level (Integer): Level should be a value between 1 (0%) and 16 (100%). Though in some cases you need to use the percentage, so if 1 to 16 doesn't work for you , then try 1 to 100 (without the percentage symbol)
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=switchlight&idx=99&switchcmd=Toggle
 **/
SwitchLight.prototype.toggle = function(idx, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", 'switchlight');
    url.addSearch("idx", idx);
    url.addSearch("switchcmd", "Toggle");
    this.domoticz._request(url, callback);
};

/** section: switchlight
 *  Return list of all lights
 *  domoticz#getAll(callback) -> null
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=getlightswitches
 **/
SwitchLight.prototype.getAll = function(callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command");
    url.addSearch("param", 'getlightswitches');
    this.domoticz._request(url, callback);
};



module.exports = SwitchLight;
