"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Application", {
  enumerable: true,
  get: function get() {
    return _Application["default"];
  }
});
exports.router = exports.store = exports.ContainerContext = exports.components = void 0;

var _Application = _interopRequireDefault(require("./Application"));

var _createDuck = _interopRequireDefault(require("./store/createDuck"));

var _sideEffects = _interopRequireDefault(require("./store/sideEffects"));

var _handleActions = _interopRequireDefault(require("./store/handleActions"));

var _createAction = _interopRequireDefault(require("./store/createAction"));

var _createFetchDuck = _interopRequireDefault(require("./store/createFetchDuck"));

var _Store = _interopRequireDefault(require("./store/Store"));

var _reduxFirstRouting = require("redux-first-routing");

var _Router = _interopRequireDefault(require("./router/Router"));

var _Link = _interopRequireDefault(require("./components/Link"));

var _Renderer = _interopRequireDefault(require("./renderer/Renderer"));

var _withServices = _interopRequireDefault(require("./components/withServices"));

var components = {
  Link: _Link["default"],
  withServices: _withServices["default"]
};
exports.components = components;
var ContainerContext = _Renderer["default"].ContainerContext;
exports.ContainerContext = ContainerContext;
var store = {
  createAction: _createAction["default"],
  handleActions: _handleActions["default"],
  createFetchDuck: _createFetchDuck["default"],
  createDuck: _createDuck["default"],
  sideEffects: _sideEffects["default"],
  Store: _Store["default"]
};
exports.store = store;
var router = {
  "goto": _reduxFirstRouting.push,
  goBack: _reduxFirstRouting.goBack,
  goForward: _reduxFirstRouting.goForward,
  Router: _Router["default"]
};
exports.router = router;