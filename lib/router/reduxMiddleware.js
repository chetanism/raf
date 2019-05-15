"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = exports["default"] = void 0;

var _reduxFirstRouting = require("redux-first-routing");

var history = (0, _reduxFirstRouting.createBrowserHistory)();
exports.history = history;
var middleware = (0, _reduxFirstRouting.routerMiddleware)(history);
var _default = middleware;
exports["default"] = _default;