module.exports = class Evs {
	constructor () {
		this._handlers = new Map();
		this._allHandlers = new Array();
	}

	on (name, ...fn) {
		if (name) {
			let _fn = this._deepArrayMerge(fn);
			this._subscribe(name, _fn);
		}
		return this;
	}

	once (name, ...fn) {
		let _fn = this._deepArrayMerge(fn);
		for (let i = _fn.length - 1; i >= 0; i--) {
			let __fn = _fn[i];
			_fn[i] = (data, name, i) => {
				__fn.apply(this, arguments);
				this.off(name, i);
			}
		}
		this.on(name, _fn);
		return this;
	}

	all (...fn) {
		let _fn = this._deepArrayMerge(fn);
		this._allHandlers = this._allHandlers.concat(_fn);
		return this;
	}

	off (name, i) {
		if (typeof i === 'number' && this._handlers.get(name)) {
			this._handlers.get(name).splice(i, 1);
		}
		else if (this._handlers.get(name)) {
			this._handlers.delete(name);
		}
		return this;
	}

	trigger (name, data) {
		for (let i = 0; i < this._allHandlers.length; i++) {
			this._allHandlers[i]((data) ? data : {});
		}
		if (name) {
			let _names = name.split(' ');
			for (let i = _names.length - 1; i >= 0; i--) {
				if (Array.isArray(this._handlers.get(_names[i]))) {
					this._handlers.get(_names[i]).forEach((fn, n) => {
						fn((data) ? data : {}, _names[i], n);
					})
				}
			}
		}
		return this;
	}

	offAll () {
    this._handlers = new Map();
		this._allHandlers = new Array();
		return this;
	}

	_subscribe(name, fn) {
		let _names = name.split(' ');
		for (let i = _names.length - 1; i >= 0; i--) {
			if (Array.isArray(this._handlers.get(_names[i]))) {
				this._handlers.set(_names[i], this._handlers.get(_names[i]).concat(fn));
			}
			else {
				this._handlers.set(_names[i], fn);
			}
		}

	}

	_deepArrayMerge (arr) {
		let _arr = [];
		_loop(arr);
		function _loop (a) {
			for (let i = a.length - 1; i >= 0; i--) {
				if (Array.isArray(a[i])) {
					_loop(a[i]);
				}
				else {
					_arr.push(a[i]);
				}
			}
		}
		return _arr.reverse();
	}
}
