
var debug = require('debug')('metalsmith-prompt');
var each = require('async').eachSeries;
var extend = require('extend');
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
 * @param {Object} schema
 * @param {Function} fn
 */

function promptFor(schema, options, fn){
  if ('function' == typeof options) fn = options, options = null;
  options = options || {};
  schema = normalize(schema);

  var color = options.color;
  var questions = 'array' == typeof schema ? schema : Object.keys(schema);
  var width = max(questions, 'length') + 4;
  var answers = {};

  each(questions, ask, function(err){
    if (err) return fn(err);
    debug('answered: %o', answers);
    fn(null, answers);
  });

  function ask(key, done){
    debug('asking for "%s"', key);
    var type = schema[key] || 'string';
    var fn = types[type];
    var question = pad(key, width);
    fn(question, color, function(val){
      debug('answered "%s" with "%s"', key, val);
      answers[key] = val;
      done();
    });
  }
}

/**
 * Normalize a `schema`.
 *
 * @param {Object or Array or String} schema
 * @return {Object}
 */

function normalize(schema){
  var ret = {};

  switch (type(schema)) {
    case 'object':
      ret = schema;
      break;
    case 'string':
      ret[schema] = 'string';
      break;
    case 'array':
      schema.forEach(function(key){
        ret[key] = 'string';
      });
      break;
  }

  return ret;
}