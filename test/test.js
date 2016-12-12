const expect = require('chai').expect;
const Evs = require('../index');



describe('testing constructor', () => {
	it('should be a constructor', () => {
		let evs = new Evs();
		expect(new Evs()).to.be.instanceof(Evs);
	})
})

describe('.on()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.on()).to.be.instanceof(Evs);
	});
	it('add a single function to _handlers', () => {
		let evs = new Evs();
		evs.on('test', () => {});
		expect(evs._handlers.get('test').length).to.be.eql(1);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers', () => {
		let evs = new Evs();
		evs.on('test', () => {}, () => {});
		expect(evs._handlers.get('test').length).to.be.eql(2);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test')[1]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers via array', () => {
		let evs = new Evs();
		evs.on('test', [() => {}, () => {}]);
		expect(evs._handlers.get('test').length).to.be.eql(2);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test')[1]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers via multiple arrays array', () => {
		let evs = new Evs();
		evs.on('test', [() => {}, () => {}], [() => {}, () => {}]);
		expect(evs._handlers.get('test').length).to.be.eql(4);
		evs._handlers.get('test').forEach((fn) => {
			expect(fn).to.be.instanceof(Function);
		})
	});
	it('add handlers for multiple names', () => {
		let evs = new Evs();
		evs.on('test1 test2', () => {});
		expect(evs._handlers.get('test1').length).to.be.eql(1);
		expect(evs._handlers.get('test2').length).to.be.eql(1);
		expect(evs._handlers.get('test1')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test2')[0]).to.be.instanceof(Function);
	})
})

describe('.once()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.once()).to.be.instanceof(Evs);
	});
	it('add a single function to _handlers', () => {
		let evs = new Evs();
		evs.once('test', () => {});
		expect(evs._handlers.get('test').length).to.be.eql(1);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers', () => {
		let evs = new Evs();
		evs.once('test', () => {}, () => {});
		expect(evs._handlers.get('test').length).to.be.eql(2);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test')[1]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers via array', () => {
		let evs = new Evs();
		evs.once('test', [() => {}, () => {}]);
		expect(evs._handlers.get('test').length).to.be.eql(2);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test')[1]).to.be.instanceof(Function);
	});
	it('add multiple functions to _handlers via multiple arrays array', () => {
		let evs = new Evs();
		evs.once('test', [() => {}, () => {}], [() => {}, () => {}]);
		expect(evs._handlers.get('test').length).to.be.eql(4);
		evs._handlers.get('test').forEach((fn) => {
			expect(fn).to.be.instanceof(Function);
		})
	});
	it('add handlers for multiple names', () => {
		let evs = new Evs();
		evs.once('test1 test2', () => {});
		expect(evs._handlers.get('test1').length).to.be.eql(1);
		expect(evs._handlers.get('test2').length).to.be.eql(1);
		expect(evs._handlers.get('test1')[0]).to.be.instanceof(Function);
		expect(evs._handlers.get('test2')[0]).to.be.instanceof(Function);
	});
	it('remove event listener once it was triggered', () => {
		let evs = new Evs();
		let n = 0;
		evs.once('test', () => {n++});
		expect(evs._handlers.get('test').length).to.be.eql(1);
		expect(evs._handlers.get('test')[0]).to.be.instanceof(Function);
		evs.trigger('test', {});
		expect(n).to.be.eql(1);
		expect(evs._handlers.get('test')).to.be.instanceof(Array);
		expect(evs._handlers.get('test').length).to.be.eql(0);
	})
})

describe('.off()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.off()).to.be.instanceof(Evs);
	});
	it('should remove all listeners with name', () => {
		let evs = new Evs();
		evs.on('test', () => {});
		expect(evs._handlers.get('test').length).to.be.eql(1);
		evs.off('test');
		expect(evs._handlers.get('test')).to.be.eql(undefined);
	})
})

describe('.offAll()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.offAll()).to.be.instanceof(Evs);
	});
	it('should remove every listener', () => {
		let evs = new Evs();
		evs.on('test1 test2', () => {});
		evs.offAll();
		expect(evs._handlers.get('test1')).to.be.eql(undefined)
		expect(evs._handlers.get('test2')).to.be.eql(undefined)
	})
})

describe('.all()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.all()).to.be.instanceof(Evs);
	});
	it('should add a listener that gets triggered by each event.', () => {
		let evs = new Evs();
		let n = 0;
		evs.all(() => {n++});
		evs.trigger('test', {});
		evs.trigger('random', {});
		expect(n).to.be.eql(2);
	})
})

describe('.trigger()', () => {
	it('should return this', () => {
		let evs = new Evs();
		expect(evs.trigger()).to.be.instanceof(Evs);
	});
	it('should set off an event', () => {
		let evs = new Evs();
		let n = 0;
		evs.on('test test2', () => {n++});
		evs.trigger('test');
		expect(n).to.be.eql(1)
	})
	it('should set off multiple events', () => {
		let evs = new Evs();
		let n = 0;
		evs.on('test test2', () => {n++});
		evs.trigger('test test2');
		expect(n).to.be.eql(2)
	})
	it('should pass data to function', () => {
		let evs = new Evs();
		let n = 0;
		evs.on('test test2', (i) => {n+=i});
		evs.trigger('test', 10);
		expect(n).to.be.eql(10);
	})
})

describe('internal functions', () => {
	it('_deepArrayMerge should merge an array deep.', () => {
		let evs = new Evs();
		expect(evs._deepArrayMerge(['testing', ['if', 'this', ['function', 'is']], 'working', ['properly']])).to.be.eql(['testing', 'if', 'this', 'function', 'is', 'working', 'properly']);
	});

	it('_subscribe should add an array of functions to _handlers', () => {
		let evs = new Evs();
		evs._subscribe('test', [() => {}]);
		expect(evs._handlers.get('test')).to.be.instanceof(Array);
	})
})