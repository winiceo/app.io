
// const WindowMock = require('window-mock').default;
// let window = new WindowMock();
// global.window = window;
// global.localStorage = window.localStorage;
// global.document = window.document;
class Cache {
    constructor() {
        this.store = window.localStorage;
        this.prefix = '_71an';
    }
    set(key, value, fn) {
        try {
            value = JSON.stringify(value);
        } catch (e) {
            value = value;
        }

        this.store.setItem(this.prefix + key, value);

        fn && fn();
    }
    get(key, fn) {
        if (!key) {
            throw new Error('没有找到key。');
            return;
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
            return;
        }
        var value = this.store.getItem(this.prefix + key);
        if (value !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                value = value;
            }
        }

        return value;
    }
    remove(key) {
        this.store.removeItem(this.prefix + key);
    }
}
export default new Cache();