
var chalk = require('chalk');
var date = require('date.js');
var prompt = require('cli-prompt');

/**
 * Prompt for a string with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.string = function(obj, color, fn){
  if ('' == obj.default) obj.default = null;
  message(obj, color);

  var exec = function(){
    prompt(obj.msg, function (val){
      if ('' != val) fn(val);
      else if (obj.default) fn(obj.default);
      else if (obj.required === false) fn(null);
      else exec();
    });
  }
  exec();
}

/**
 * Prompt for a password with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.password = function(obj, color, fn){
  if ('' == obj.default) obj.default = null;
  message(obj, color);

  var exec = function(){
    prompt(obj.msg, true, function (val){
      if ('' != val) fn(val);
      else if (obj.default) fn(obj.default);
      else exec();
    });
  }
  exec();
}

/**
 * Prompt for a number with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.number = function(obj, color, fn){
  obj.default = parseNumber(obj.default);
  message(obj, color);

  var exec = function() {
    prompt(obj.msg, function(val){
      var num = parseNumber(val);
      if ('' == val || null == num) {
        if (obj.default) fn(obj.default);
        else if (obj.required === false) fn(null);
        else exec();
      }
      else fn(num);
    });
  };
  exec();
}

/**
 * Prompt for a boolean with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.boolean = function(obj, color, fn){
  obj.default = /^(y|yes|true)$/i.test(obj.default);
  obj.msg += ': ';
  if (color) obj.msg = chalk[color](obj.msg);
  obj.msg += obj.default ? '(Y/n) ' : '(y/N) ';

  prompt(obj.msg, function(val){
    if ('' == val || !/^(y|yes|true|n|no|false)$/i.test(val)) fn(obj.default);
    else fn(/^(y|yes|true)$/i.test(val));
  });
}

/**
 * Prompt for a date with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.date = function(obj, color, fn){
  if (undefined == obj.default || /^now$/i.test(obj.default) || isNow(obj.default)) {
    obj.default = 'now';
  }
  message(obj, color);

  prompt(obj.msg, function(val){
    var wrong = isNow(val) && !/^\s*now\s*$/i.test(val);
    if ('' == val || wrong) val = obj.default;
    fn(parseDate(val));
  });
}

/**
 * Format the prompt message.
 *
 * @param {Object} obj
 * @param {Number} color
 */

function message(obj, color){
  obj.msg += ': ';
  if (color) obj.msg = chalk[color](obj.msg);
  if (null != obj.default) obj.msg += '(' + obj.default + ') ';
}

/**
 * Parse a number value with `null` fallback.
 *
 * @param {Object} val
 * @return {Number}
 */

function parseNumber(val){
  var ret = parseFloat(val, 10);
  return isNaN(ret) || val != ret.toString() ? null : ret;
}

/**
 * Parse a date value with `now` fallback.
 *
 * @param {Object} val
 * @return {Date}
 */

function parseDate(val){
  if ('string' == typeof val) {
    var num = parseInt(val, 10);
    if (val == num.toString()) val = num;
  }    
  var ret = new Date(val);
  if (invalid(ret)) ret = date(val);
  if (invalid(ret)) ret = new Date();
  return ret;
}

/**
 * Check if a parsed date is approximately `now`.
 *
 * @param {Object} date
 * @return {Boolean}
 */
 
function isNow(date){
  var delta = Math.abs(parseDate(date).getTime() - new Date().getTime());
  return delta < 1000;
}

/**
 * Test whether a date is invalid.
 *
 * @param {Date} date
 * @return {Boolean}
 */

function invalid(date){
  return isNaN(date.getTime());
}