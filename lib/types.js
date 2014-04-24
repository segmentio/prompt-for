
var chalk = require('chalk');
var date = require('date.js');
var fmt = require('util').format;
var prompt = require('cli-prompt');
var colors = chalk.styles;

/**
 * Prompt for a string for a given `schema` and `options`.
 *
 * @param {Object} schema
 * @param {Object} options
 * @param {Function} fn
 */

exports.string = function(schema, options, fn){
  var msg = format(schema, options);
  prompt(msg, fn);
}

/**
 * Prompt for a password for a given `schema` and `options`.
 *
 * @param {Object} schema
 * @param {Object} options
 * @param {Function} fn
 */

exports.password = function(schema, options, fn){
  var msg = format(schema, options);
  prompt.password(msg, fn);
}

/**
 * Prompt for a number for a given `schema` and `options`.
 *
 * @param {Object} schema
 * @param {Object} options
 * @param {Function} fn
 */

exports.number = function(schema, options, fn){
  var msg = format(schema, options);
  prompt(msg, function(val){
    val = parseFloat(val, 10);
    if (isNaN(val)) return fn();
    fn(val);
  });
}

/**
 * Prompt for a boolean for a given `schema` and `options`.
 *
 * @param {Object} schema
 * @param {Object} options
 * @param {Function} fn
 */

exports.boolean = function(schema, options, fn){
  var msg = format(schema, options);
  prompt(msg, function(val){
    if ('' == val) return fn();
    fn(/^(y|yes|true)$/i.test(val));
  });
}

/**
 * Prompt for a date for a given `schema` and `options`.
 *
 * @param {Object} schema
 * @param {Object} options
 * @param {Function} fn
 */

exports.date = function(schema, options, fn){
  var msg = format(schema, options);
  prompt(msg, function(val){
    var ret = new Date(val);
    if (invalid(ret)) ret = date(val);
    return invalid(ret) ? fn() : fn(ret);
  });
}

/**
 * Format the prompt message.
 *
 * @param {Object} schema
 * @param {Object} options
 */

function format(schema, options){
  var color = options.color;
  var sep = options.separator || ':';
  var label = color in colors ? chalk[color](schema.label) : schema.label;
  return fmt('%s%s %s ', label, sep, hint(schema));
}

/**
 * Format the default hint for a `schema`.
 *
 * @param {Object} schema
 * @return {String}
 */

function hint(schema){
  var def = schema.default;
  switch (schema.type) {
    case 'boolean': return def ? '(Y/n)' : '(y/N)';
    case 'date': if (!def) return '(now)';
    default: return def ? fmt('(%s)', def) : '';
  }
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