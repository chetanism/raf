"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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
Object.defineProperty(exports, "createDuck", {
  enumerable: true,
  get: function get() {
    return _createDuck["default"];
  }
});
Object.defineProperty(exports, "sideEffects", {
  enumerable: true,
  get: function get() {
    return _sideEffects["default"];
  }
});
Object.defineProperty(exports, "handleActions", {
  enumerable: true,
  get: function get() {
    return _handleActions["default"];
  }
});
Object.defineProperty(exports, "createAction", {
  enumerable: true,
  get: function get() {
    return _createAction["default"];
  }
});
Object.defineProperty(exports, "createFetchDuck", {
  enumerable: true,
  get: function get() {
    return _createFetchDuck["default"];
  }
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function get() {
    return _Store["default"];
  }
});
Object.defineProperty(exports, "goto", {
  enumerable: true,
  get: function get() {
    return _reduxFirstRouting.push;
  }
});
Object.defineProperty(exports, "goBack", {
  enumerable: true,
  get: function get() {
    return _reduxFirstRouting.goBack;
  }
});
Object.defineProperty(exports, "goForward", {
  enumerable: true,
  get: function get() {
    return _reduxFirstRouting.goForward;
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return _Router["default"];
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _Link["default"];
  }
});
Object.defineProperty(exports, "withServices", {
  enumerable: true,
  get: function get() {
    return _withServices["default"];
  }
});
Object.defineProperty(exports, "createApplication", {
  enumerable: true,
  get: function get() {
    return _boot.createApplication;
  }
});
exports.router = exports.store = exports.ContainerContext = exports.components = exports.dilite = void 0;

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

var _boot = require("./boot");

var _Dilite = _interopRequireWildcard(require("./dilite/Dilite"));

var dilite = {
  DiliteError: _Dilite.DiliteError,
  Container: _Dilite["default"],
  ctor: _Dilite.ctor,
  value: _Dilite.value,
  factory: _Dilite.factory
};
exports.dilite = dilite;
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