
var assert = require('assert');
var prompt = require('..');

describe('prompt-for', function(){
  it('should expose a function', function(){
    assert.equal(typeof prompt, 'function');
  });

  it('should prompt for a schema', function(done){
    prompt({ one: 'string', two: 'string' }, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.one, 'one');
      assert.equal(answers.two, 'two');
      done();
    });
    answer('one');
    answer('two');
  });

  it('should accept an array shorthand', function(done){
    prompt(['one', 'two'], function(err, answers){
      if (err) return done(err);
      assert.equal(answers.one, 'one');
      assert.equal(answers.two, 'two');
      done();
    });
    answer('one');
    answer('two');
  });

  it('should accept a string shorthand', function(done){
    prompt('one', function(err, answers){
      if (err) return done(err);
      assert.equal(answers.one, 'one');
      done();
    });
    answer('one');
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

  it('should coerce lists', function(done){
    prompt({ list: 'list' }, function(err, answers){
      if (err) return done(err);
      assert(answers.list instanceof Array);
      assert.equal(answers.list[0], 'one');
      assert.equal(answers.list[1], 'two');
      assert.equal(answers.list[2], 'three');
      done();
    });
    answer('one, two, three');
  });

  it('should apply defaults', function(done){
    prompt({ number: { type: 'number', default: 42 }}, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.number, 42);
      done();
    });
    answer('');
  });

  it('should wait for required values', function(done){
    prompt({ string: { required: true }}, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.string, '42');
      done();
    });
    answer('');
    answer('42');
  });

  it('should use a default for required values', function(done){
    prompt({ number: { type: 'number', default: 42, required: true }}, function(err, answers){
      if (err) return done(err);
      assert.equal(answers.number, 42);
      done();
    });
    answer('');
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