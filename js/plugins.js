/**
 * PLUGIN DIRECTORY
 * What you can find in this file [listed in order they appear]
 1. console.log() wrapper
 2. requestNextAnimFrame() 
 */

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/**
 * requestNextAnimFrame
 * A comprehensive polyfill for animations to replace setTimeout() and setInterval()
 * usage: window.requestNextAnimationFrame(animate); // inside animate()
 */
window.requestNextAnimFrame = (function() {
var originalWebkitMethod,
    wrapper = undefined,
    callback = undefined,
    geckVersion = 0,
    userAgent = navigator.userAgent,
    index = 0,
    self = this;

// Wordaround for Chrome 10 bug where Chrome does 
// not pass the time to the animation function

if (window.webkitRequestAnimationFrame) {
    // Define the wrapper
    
    wrapp = function(time) {
        if (time === undefined) {
            time = +new Date();
        }
        self.callback(time);
    };

    // Make the switch
    
    originalWebkitMethod = window.webkitRequestAnimationFrame;

    window.webkitRequestAnimationFrame = function(callback, element) {
        self.callback = callback;

        // Browser calls wrapper; wrapper calls callback        
        originalWebkitMethod(wrapper, element);
    }
}

// Workaround for Gecko 2.0, which has a bug in 
// mozRequestAnimationFrame() that restricts animations
// to 30-40 fps.

if (window.mozRequestAnimationFrame) {
    // Check the Gecho version. Gecko is used by browsers other than
    // Firefox. Gecko 2.0 corresponds to Firefox 4.0
    index = userAgent.indexOf('rv:');

    if (userAgent.indexOf('Gecko') != -1) {
        geckoVersion = userAgent.substr(index + 3, 3);

        if (geckoVersion === '2.0') {
            // Forces the return statement to fall through to the setTimeout() function
            window.mozRequestAnimationFrame = undefined;
        }
    }
}

return window.requestAnimationFrame     ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    window.oRequestAnimationFrame       ||
    window.msRequestAnimationFrame      ||

    function(callback, element) {
        var start,
            finish;

        window.setTimeout(function() {
            start = +new Date();
            callback(start);
            finish = +new Date();

            self.timeout = 1000 / 60 - (finish - start);
        
        }, self.timeout);
    };
})();

