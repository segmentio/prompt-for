
var assert = require('assert');
var prompt = require('..');

describe('prompt-for', function(){
  it('should expose a function', function(){
    assert.equal(typeof prompt, 'function');
  });

  it('should prompt for a schema', function(done){
    prompt({ string: 'string' }, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.string, 'name');
      done();
    });
    answer('name');
  });

  it('should coerce numbers', function(done){
    prompt({ number: 'number' }, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.number, 42);
      done();
    });
    answer('42');
  });

  it('should coerce booleans', function(done){
    prompt({ boolean: 'boolean' }, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.boolean, true);
      done();
    });
    answer('yes');
  });

  it('should coerce dates', function(done){
    prompt({ date: 'date' }, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.date.getTime(), 1343260800000);
      done();
    });
    answer('2012-07-26');
  });
});

/**
 * Write an answer `str` to stdin.
 *
 * @param {String} str
 * @param {Function} fn
 */

function answer(str){
  str.split('').forEach(press);
  press('', { name: 'enter' });
}

/**
 * Trigger a keypress on stdin with `c` and `key`.
 *
 * @param {String} c
 * @param {Object} key
 */

function press(c, key){
  process.stdin.emit('keypress', c, key);
}