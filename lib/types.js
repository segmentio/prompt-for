
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

exports.string = function(msg, color, fn){
  msg += ': ';
  if (color) msg = chalk[color](msg);
  prompt(msg, fn);
}

/**
 * Prompt for a number with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.number = function(msg, color, fn){
  msg += ': ';
  if (color) msg = chalk[color](msg);
  prompt(msg, function(val){
    fn(parseFloat(val, 10) || null);
  });
}

/**
 * Prompt for a boolean with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.boolean = function(msg, color, fn){
  msg += ':';
  if (color) msg = chalk[color](msg);
  msg += ' (y/n) ';
  prompt(msg, function(val){
    fn(/y|yes/i.test(val));
  });
}

/**
 * Prompt for a date with `msg`.
 *
 * @param {String} msg
 * @param {String} color (optional)
 * @param {Function} fn
 */

exports.date = function(msg, color, fn){
  msg += ': ';
  if (color) msg = chalk[color](msg);
  prompt(msg, function(val){
    var ret = new Date(val);
    if (invalid(ret)) ret = date(val);
    if (invalid(ret)) ret = null;
    fn(ret);
  });
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