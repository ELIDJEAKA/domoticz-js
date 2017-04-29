'use strict';

var request = require('request');
var URI = require("urijs");
var _ = require('underscore');

var Group = require('./group');
var Scene = require('./scene');
var System = require('./system');
var SwitchLight = require('./switchlight');
var Device = require('./device');
var Hardware = require('./hardware');
var UserVariable = require('./uservariable');

/**
 * class DomoticzJs
 *
 *  Copyright 2015 Tyneo Consulting.
 *
 *  This product includes software developed by
 *  Tyneo Consulting (http://tyneo.net).
 *
 *  Author: Samuel Kauffmann <skauffmann@tyneo.net>
 *
 **/


/** section: Domoticz
 * Create a new instance of DomoticzJS
 *
 **/
function DomoticzJs(config) {
	if (!(this instanceof DomoticzJs)) return new DomoticzJs(config);
	this.config = {
	    protocol: 'http',
	    host: '2222',
	    port: 80,
	    username: undefined,
	    password: undefined
	};
	this.config = _.defaults(config, this.config);

	this.device = new Device(this);
	this.hardware = new Hardware(this);
	this.system = new System(this);
	this.switchLight = new SwitchLight(this);
	this.scene = new Scene(this);
	this.group = new Group(this);
	this.uservariable = new UserVariable(this);
}


/**
 *  domoticz#_buildConfig() -> (array)
 *
 *  Merge configs
 **/
DomoticzJs.prototype._buildConfig = function (c1, c2) {
    if(_.isArray(c1) && _.isArray(c2)) {
        for (var name in c1) {
            c1[name] = c2[name];
        }
    } //todo else { throw Exception
    return c1;
}

/**
 *  domoticz#_getUrl() -> (URIJS)
 *
 *  Create an URI JS object to the Domoticz JSON API
 **/
DomoticzJs.prototype._getUrl = function() {
    var url = URI(this.config.protocol + "://" + this.config.host + "/json.htm");
    if(this.config["port"] && this.config["port"] != "") {
        url.port(this.config["port"]);
    }
    if(this.config["protocol"] && this.config["protocol"] != "") {
        url.protocol(this.config["protocol"]);
    }
    if(this.config["username"] && this.config["username"] != "") {
        url.username(this.config["username"]);
        if(this.config["password"]) {
            url.password("password");
        }
    }
    return url;
};

/**
 *  domoticz#_request(url, callback) -> null
 *      - url (String): URL to the json API for Domoticz
 *      - callback (Function): function to be called when the request returns.
 *          If the the request returns with an error, the error is passed to
 *          the callback as its first argument (NodeJS-style).
 *
 *  Send an HTTP request to the server and pass the result to a callback.
 **/
DomoticzJs.prototype._request = function(url, callback) {
    // console.log(url)
    function callCallback(err, result) {
        if (callback && _.isFunction(callback) ) {
            var cb = callback;
            callback = undefined;
            cb(err, result);
        }
    }
    request(url.toString(), function (error, res, data) {
        if (res.statusCode >= 400 && res.statusCode < 600 || res.statusCode < 10) {
            callCallback(new error.HttpError(data, res.statusCode));
        } else {
            res.data = data;
            callCallback(null, res);
        }
    });
};

module.exports = DomoticzJs;
