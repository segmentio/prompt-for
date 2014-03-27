
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
  deceased: 'boolean'
};

prompt(schema, function(err, answers){
  assert(answers.name == 'Ian');
  assert(answers.siblings == 2);
  assert(answers.birthday.getTime() == 1343260800000);
  assert(answers.deceased == false);
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

## API

#### prompt(schema, [options], fn)

  Prompt the user with the given `schema` and optional `options`, then callback with `fn(err, answers)`. Options default to:

    {
      color: null,
      pad: true
    }

## License

  MIT