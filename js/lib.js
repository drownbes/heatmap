/* global ActiveXObject */
/* exported lib */
var lib = (function() {
	"use strict";
	/* source "http://stackoverflow.com/questions/2557247/easiest-way-to-retrieve-cross-browser-xmlhttprequest" */
	function Xhr() { /* returns cross-browser XMLHttpRequest, or null if unable */
		try {
			return new XMLHttpRequest();
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml3.XMLHTTP");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {}
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
		return null;
	}


	function Ajax(url, success, fail) {
		var xmlhttp = new Xhr();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					var resp = JSON.parse(xmlhttp.responseText);
					if (resp) {
						success(resp);
					} else {
						fail(xmlhttp.statusText);
					}
				} else {
					fail(xmlhttp.statusText);
				}
			}
		};
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	}

	function ById(id) {
		return document.getElementById(id);
	}

	function Def(providedValue, defaultValue) {
		return (providedValue !== undefined) ? providedValue : defaultValue;
	}

	function Log10(x) {
		return Math.ceil(Math.log(x) / Math.log(10));
	}

	function Div(x, y) {
		return (x - x % y) / y;
	}

	function C_10(x) {
		var p = Log10(x),
			res, d;
		if (p === 1) {
			res = (Div(x, 10) + 1) * 10;
		} else {
			d = Math.pow(10, p - 1);
			res = (Div(x, d) + 1) * d;
		}
		console.log('C_10', x, res);
		return res;
	}

	// 1 lever deep extend
	function Extend(s_obj,e_obj) {
		for(var prop in e_obj) {
			if(hasOwnProperty.call(e_obj,prop)) {
				s_obj[prop] = e_obj[prop];
			}
		}
		return s_obj;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		xhr: Xhr,
		ajax: Ajax,
		byid: ById,
		def: Def,
		c_10: C_10,
		extend: Extend,
		get_random_int : getRandomInt
	};
})();

