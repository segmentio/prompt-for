
# prompt-for

  Prompt the user for a series of answers.

## Installation

    $ npm install prompt-for

## Example

```js
var prompt = require('prompt-for');
var schema = {
  name: 'string',
  email: 'string',
  birthday: 'date',
  deceased: 'boolean'
};

prompt(schema, function(err, answers){
  assert(answers.name == 'Ian');
});
```

## API

#### prompt(schema, [options], fn)

  Prompt the user with the given `schema` and optional `options`, then callback with `fn(err, answers)`. Options default to:

    {
      color: null
    }

## License

  MIT