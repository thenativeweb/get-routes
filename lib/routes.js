
const _routes = new WeakMap();
let that = null;
class Routes {

	constructor() {
		that = this;
		_routes.set(that, {});
	}
	addToGetMethodList(path) {
		if (_routes.get(that).get === undefined)
			_routes.get(that).get = [];
		_routes.get(that).get.push(path);
	}
	addToPostMethodList(path) {
		if (_routes.get(that).post === undefined)
			_routes.get(that).post = [];
		_routes.get(that).post.push(path);
	}
	addToPutMethodList(path) {
		if (_routes.get(that).put === undefined)
			_routes.get(that).put = [];
		_routes.get(that).put.push(path);
	}
	addToDeleteMethodList(path) {
		if (_routes.get(that).delete === undefined)
			_routes.get(that).delete = [];
		_routes.get(that).delete.push(path);
	}
	addToPatchMethodList(path) {
		if (_routes.get(that).patch === undefined)
			_routes.get(that).patch = [];
		_routes.get(that).patch.push(path);
	}
	addToAllMethod(path) {
		that.addToGetMethodList(path);
		that.addToDeleteMethodList(path);
		that.addToPatchMethodList(path);
		that.addToPostMethodList(path);
		that.addToPutMethodList(path);
	}
	processEndpoint(method, path) {
		switch (method.toLowerCase()) {
		case 'get':
			that.addToGetMethodList(path);
			break;
		case 'post':
			that.addToPostMethodList(path);
			break;
		case 'put':
			that.addToPutMethodList(path);
			break;
		case 'delete':
			that.addToDeleteMethodList(path);
			break;
		case 'patch':
			that.addToPatchMethodList(path);
			break;
		}
	}
	export() {
		return _routes.get(that);
	}
}

module.exports = Routes;