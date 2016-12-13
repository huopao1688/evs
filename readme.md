[![codecov](https://codecov.io/gh/danielkov/evs/branch/master/graph/badge.svg)](https://codecov.io/gh/danielkov/evs)[![Build Status](https://travis-ci.org/danielkov/evs.svg?branch=master)](https://travis-ci.org/danielkov/evs)


# Read me

This is an ES6 Event Emitter or Event system, that is fast and flexible and makes use of awesome next generation JavaScript features.

### Installation

```js
$ npm i --save evs
```

If you are planning to use it in the browser, for a while you'll need to compile it with something like Babel to make sure it works for everyone.

If using it with Node JS, you need to make sure you are running a version which is compatible with the ES2015 features. You may need to run `node --harmony` if it doesn't work for you.

### API

#### .constructor()

Creates a new instance. Example usage:

```js
const Evs = require('evs');

let evs = new Evs();
```

As this is an ES6 class, you can also extend it and give it your own functionality:

```js
class myEvs extends Evs {
	constructor () {
		super() // This line is required.
	}

	// Namespacing our trigger.

	do (name, data) {
		this.trigger(name, data);
	}
}
```

Using the basic API:

```js

let evs = new Evs();

// Subscribe to an event:

evs.on('name', myFunc);

// Pass more functions into a single handler:

evs.on('name', myFunc1, myFunc2, myFunc3);

// Use a function for more than one event:

evs.on('name test click', (data) => {console.log(data)});

// Use an array of functions, or even multiple arrays of multiple functions:

evs.on('name', myFunc1, [myFunc2, myFunc3, [myFunc4, myFunc5]]);

// Subscribe to an event only once (same API as on()):

evs.once('name', myFunc);

// Unsubscribe from an event:

evs.off('name', 1) // This will remove the second handler

evs.off('test') // This will remove all handlers

// Unsub from all events (reset emitter):

evs.ofAll();

// Trigger an event:

evs.trigger('name') // No data

evs.trigger('click', {e: event}); // Object as data

// Trigger multiple events:

evs.trigger('click submit', {e: event});

```

### Testing

To run test, install dependencies with:

```
npm i
```

Afterwards run

```
npm test
```

### Contribution

If you have any suggestions feel free to add a PR. Bugfixes and performance improvements are always welcome. :)
