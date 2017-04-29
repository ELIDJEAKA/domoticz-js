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
    url.addSearch("type", "command")
    .addSearch("param", 'switchlight');
    url.addSearch("idx", idx);
    url.addSearch("switchcmd", "Off");
    //console.log(url)
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
 * /json.htm?type=command&param=switchlight&idx=99&switchcmd=Toggle
 **/
SwitchLight.prototype.getAll = function(callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command");
    url.addSearch("param", 'getlightswitches');
    this.domoticz._request(url, callback);
};


/** section: switchLights
 * Add timer to a switchLight
 *  switchLight#addTimer(idx, active, timertype, date, hour, min, randomness, command, level,hue, days,mday,month,occurence,callback) -> null
 *      - idx (Integer): index of your switchLight/group.
 *      - active (Boolean):  true/false
 *      - timertype (Integer):  0 = Before Sunrise, 1 = After Sunrise, 2 = On Time, 3 = Before Sunset, 4 = After Sunset, 5 = Fixed Date/Time
 *      - date (String):  MM-DD-YYYY
 *      - hour (Integer):  hour
 *      - min (Integer):  minute
 *      - randomness (Boolean):  true/false
 *      - command (Boolean):  0/1
 *      - level (Integer):  0..100 (%)
 *      - hue (Integer):  hue
 *      - days (String):  0x80 = Everyday, 0x100 = Weekdays, 0x200 = Weekends, 0x01 = Mon, 0x02 = Tue, 0x04 = Wed, 0x08 = Thu, 0x10 = Fri, 0x20 = Sat, 0x40 = Sun
 *      - mday (Integer):  mday
 *      - month (Integer):  month
 *      - occurence (Integer):  occurence
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=addtimer&idx=number&active=&timertype=&date=&hour=&min=&randomness=&command=&level=&hue=&days=&mday=&month=&occurence=
 **/
SwitchLight.prototype.addTimer = function(idx, active, timertype, date, hour, min, randomness,command, level,hue, days,mday,month,occurence, callback) {
    var url  = this.domoticz._getUrl();
    url.addSearch("type", "command").addSearch("param", "addtimer");
    url.addSearch("idx", idx);
    url.addSearch("active", active ? "true" : "false");
    url.addSearch("timertype", timertype);
    url.addSearch("date", date);
    url.addSearch("hour", hour);
    url.addSearch("min", min);
    url.addSearch("randomness", randomness ? "true" : "false");
    url.addSearch("command", command ? 0 : 1);
    url.addSearch("level", level);
    url.addSearch("hue", hue);
    url.addSearch("days", days);
    url.addSearch("mday", mday);
    url.addSearch("month", month);
    url.addSearch("occurence", occurence);
    this.domoticz._request(url, callback);
};

/** section: switchLight
 *  Delete a timer to  a switchLight
 *  switchLight#clearTimers(idx, callback) -> null
 *      - idx (Integer): id of your switchLight timer(This number can be found in the switchLight timer tab in the column "IDX")
 *      - callback (Function): function to call when the request is finished with an error as first argument and result data as second argument.
 *
 * /json.htm?type=command&param=cleartimers&idx=number
 **/
SwitchLight.prototype.clearTimers =function(idx,callback){

    var url = this.domoticz._getUrl()
    url.addSearch("type", "command").addSearch("param", "cleartimers");
    url.addSearch("idx",idx);
    //console.log(url)
    this.domoticz._request(url,callback);
};





module.exports = SwitchLight;
