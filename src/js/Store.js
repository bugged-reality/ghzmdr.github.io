const Store = (function() {
    class Store {
        constructor() {
            this._props = {};
            this._callbacks = {};
        }

        get(key) {
            return this._props[key];
        }

        set(key, value) {
            if (value !== this._props[key]) {
                this._props[key] = value;
                this._trigger(key);
            }

            return this._props[key];
        }

        observe(key, callback) {
            if (!this._callbacks[key]) {
                this._callbacks[key] = [];
            }

            this._callbacks[key].push(callback);
        }

        _trigger(key) {
            const callbacks = this._callbacks[key]
            if (callbacks)  {
                callbacks.forEach(c => c(this._props[key]))
            }
        }
    }

    return new Store();
}());

export default Store
