
var debug = require('debug')('prompt-for');
var each = require('async').eachSeries;
var max = require('max-component');
var pad = require('pad-component').left;
var type = require('component-type');
var types = require('./types');

/**
 * Expose `promptFor`.
 */

module.exports = promptFor;

/**
 * Prompt for a `schema` of responses.
 *
 * @param {Object or Array or String} schema
 * @param {Object} options (optional)
 *   @property {String} color
 *   @property {Number} pad
 * @param {Function} fn
 */

function promptFor(schema, options, fn){
  if ('function' == typeof options) fn = options, options = null;
  options = options || {};
  schema = normalize(schema, options);

  var questions = Object.keys(schema);
  var answers = {};

  each(questions, ask, function(err){
    if (err) return fn(err);
    debug('answered: %o', answers);
    fn(null, answers);
  });

  function ask(key, done){
    debug('asking for "%s"', key);
    var obj = schema[key];
    var type = obj.type;
    var fn = types[type];
    if (!fn) return done(new Error('Unrecognized type: "' + type + '".'));

    fn(obj, options, function(val){
      debug('answered "%s" with "%s"', key, val);
      if (null == val && null != obj.default) val = obj.default;
      if (null == val && obj.required) return ask(key, done);
      answers[key] = val;
      done();
    });
  }
}

/**
 * Normalize a `schema`.
 *
 * @param {Object or Array or String} schema
 * @param {Object} options
 * @return {Object}
 */

function normalize(schema, options){
  if ('string' == type(schema)) {
    var key = schema;
    schema = {};
    schema[key] = {};
  }

  if ('array' == type(schema)) {
    var arr = schema;
    schema = {};
    arr.forEach(function(key){
      schema[key] = {};
    });
  }

  if ('object' == type(schema)) {
    Object.keys(schema).forEach(function(key){
      var val = schema[key];
      if ('string' != type(val)) return;
      schema[key] = {};
      schema[key].type = val;
    });
  }

  var keys = Object.keys(schema);
  var width = max(keys, 'length') + (options.pad ? options.pad : 0);
  var padding = options.pad ? new Array(options.pad + 1).join(' ') : '';

  keys.forEach(function(key){
    var obj = schema[key];
    obj.type = obj.type || 'string';
    obj.required = !! obj.required;
    if ('boolean' == obj.type) obj.default = obj.default || false;
    if ('date' == obj.type) obj.default = obj.default || 'now';

    if (obj.label) {
      if (options.pad) obj.label = padding + obj.label;
    } else {
      obj.label = key;
      if (options.pad) obj.label = pad(obj.label, width);
    }
  });

  return schema;
}