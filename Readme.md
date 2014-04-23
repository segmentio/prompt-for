
# prompt-for

  Prompt the user for a series of answers.

## Installation

    $ npm install prompt-for

## Example

```js
var prompt = require('prompt-for');

var schema = {
  name: 'string',
  siblings: 'number',
  birthday: 'date',
  deceased: 'boolean',
  secret: 'password'
};

prompt(schema, function(err, answers){
  assert(answers.name == 'Ian');
  assert(answers.siblings == 2);
  assert(answers.birthday.getTime() == 1343260800000);
  assert(answers.deceased == false);
  assert(answers.secret == '1234');
});
```

  And if you're being lazy...

```js
prompt(['name', 'website'], function(err, answers){
  assert(answers.name == 'Ian');
  assert(answers.website == 'ianstormtaylor.com');
});
```

  Or even...

```js
prompt('name', function(err, answers){
  assert(answers.name == 'Ian');
});
```

## Options

  Define or overwrite default values...
  
  * Default `boolean` value is **false**
  * Default `date` value is **now**
  
```js
var prompt = require('prompt-for');

var schema = {
  name: {type:'string', default:'Ian'},
  siblings: {type:'number', default:42},
  birthday: {type:'date', default:'yesterday'},
  deceased: {type:'boolean', default:true},
  secret: {type:'password', default:'1234'}
};

prompt(schema, function(err, answers){
  assert(answers.name == 'Ian');
  // ...
});
```

  Disable required for `string` and `number`...
  
  By default, empty or incorrect answers when asked a string or a number, will be asked again. Set `required` to **false** allows you to skip the question.
  
```js
var prompt = require('prompt-for');

var schema = {
  name: {type:'string', required:false},
  siblings: {type:'number', required:false}
};

prompt(schema, function(err, answers){
  assert(answers.name == null);
  assert(answers.number == null);
});
```

## API

#### prompt(schema, [options], fn)

  Prompt the user with the given `schema` and optional `options`, then callback with `fn(err, answers)`. Options default to:

    {
      color: null,
      pad: true
    }

## License

  MIT