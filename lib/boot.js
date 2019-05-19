"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApplication = createApplication;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Application = _interopRequireDefault(require("./Application"));

var _Store = _interopRequireDefault(require("./store/Store"));

var _Router = _interopRequireDefault(require("./router/Router"));

var _Renderer = _interopRequireDefault(require("./renderer/Renderer"));

var _redux = require("redux");

var _sideEffects = _interopRequireDefault(require("./store/sideEffects"));

var _Dilite = require("./dilite/Dilite");

var config = {
  app: (0, _Dilite.ctor)(_Application["default"], ['store', 'router', 'renderer', 'sideEffect']),
  sideEffect: (0, _Dilite.ctor)(_sideEffects["default"]),
  store: (0, _Dilite.factory)(function (appReducer, sideEffect) {
    var rootReducer = (0, _redux.combineReducers)({
      app: appReducer,
      router: _Router["default"].reducer
    });
    return new _Store["default"](rootReducer, _Router["default"].middleware, sideEffect.getMiddleware());
  }, ['__appReducer', 'sideEffect']),
  router: (0, _Dilite.factory)(function (store, routes) {
    return new _Router["default"](routes, store);
  }, ['store', 'routes']),
  renderer: (0, _Dilite.factory)(function (store, router, container, RootComponent) {
    return new _Renderer["default"](store, router, document.getElementById('root'), container, RootComponent);
  }, ['store', 'router', 'container', 'rootComponent'])
};

function createApplication(services, appReducer) {
  var allConfigs = (0, _objectSpread2["default"])({
    __appReducer: (0, _Dilite.value)(appReducer)
  }, config, services);
  var container = new _Dilite.Container(allConfigs);
  return {
    app: container.get('app'),
    container: container
  };
}