/**
 * Author: Isobar
 * 
 */
ISOBAR = {
	common: {
		init: function() {

		}
	},
	init: function() {
		
	},

	// Useful utilities for browsers and other handy functions
	utils: function() {
		// Boolean check if userAgent is Firefox on Android
		isAndroidFirefox: function() {
			if (ISOBAR.utils.isFirefox() && navigator.userAgent.toLowerCase().indexOf("android") !== -1 ) {
				return true;
			} else {
				return false;
			}
		},
		// Boolean check if the userAgent is for Stock Android Browser
		isAndroidStockBrowser: function() {
			if (navigator.userAgent.toLowerCase().indexOf('linux; u; android') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		// Boolean check if the userAgent is Firefox browser
		isFirefox: function() {
			if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		// Boolean check if the userAgent is Safari browser
		isSafari: function() {
			if (navigator.vendor) {
				return (navigator.vendor.toLowerCase().indexOf('apple') !== -1);
			} else {
				return false;
			}
		},
		// Adds body class for browser
		browserBodyClass: function() {
			var ua = $.browser;
			if (ua.webkit == true) {
				$('body').addClass('webkit');
			} else if (ua.mozilla == true) {
				$('body').addClass('firefox');
			} else if (ua.msie == true) {
				$('body').addClass('msie');
			}
			if (ISOBAR.utils.isAndroidStockBrowser()) {
				$('body').addClass('androidDefault');
			}
			if (ISOBAR.utils.isAndroidFirefox()) {
				$('body').addClass('androidFirefox');
			}
			if (ISOBAR.utils.isSafari()) {
				$('body').addClass('safari');
			}
		},
		// Creates cache for images, scripts or other resources
		createCache: function(requestFunction) {
			var cache = {};
			return function(key, callback) {
				if (!cache[key]) {
					cache[key] = $.Deferred(function(defer) {
						requestFunction(defer, key);
					}).promise();
				}
				return cache[key].done(callback);
			};
		},
		// Checks if argument is an array or not
		isArray: function(obj) {
			//returns true is it is an array
			if (obj.constructor.toString().indexOf('Array') === -1) {
				return false;
			} else {
				return true;
			}
		},
		// Checks if a function exists or not
		function_exists: function(function_name) {
			if (typeof function_name === 'string') {
		    	return (typeof window[function_name] === 'function');
			} else {
		    	return (function_name instanceof Function);
			}
		},
		// Get current domain for environment settings
		getCurrentDomain: function() {
			var urlpattern = new RegExp("((http|https)://.*?)(:|/).*$"),
				parsedurl = window.location.href.match(urlpattern);
			return parsedurl[1];
		}
	}
};
UTIL = {
	fire: function(func, funcname, args) {
		var namespace = ISOBAR; // indicate your obj literal namespace here
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {
		var b = document.body,
			bid = b.id,
			c = b.className.split(/\s+/),
			cLen = c.length;
		UTIL.fire('common');
		UTIL.fire(bid);
		for (var i = 0; i < cLen; i++) {
			UTIL.fire(c[i]);
			UTIL.fire(c[i], bid);
		};
		UTIL.fire('common', 'finalize');
	}
};
// kick it all off here
$(document).ready(UTIL.loadEvents);