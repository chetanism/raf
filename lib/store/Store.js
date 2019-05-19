"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _redux = require("redux");

var _asyncMiddleware = _interopRequireDefault(require("./asyncMiddleware"));

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var Store =
/*#__PURE__*/
function () {
  function Store(reducer) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Store);
    (0, _defineProperty2["default"])(this, "getState", function () {
      return _this.store.getState();
    });
    (0, _defineProperty2["default"])(this, "dispatch", function () {
      var _this$store;

      return (_this$store = _this.store).dispatch.apply(_this$store, arguments);
    });
    (0, _defineProperty2["default"])(this, "storeUpdated", function () {
      if (_this.trigger) {
        _this.listeners.forEach(function (listener) {
          return listener();
        });
      }
    });
    (0, _defineProperty2["default"])(this, "subscribe", function (listener) {
      _this.listeners.push(listener);

      return function () {
        var idx = _this.listeners.indexOf(listener);

        _this.listeners.splice(idx, 1);
      };
    });

    for (var _len = arguments.length, middlewares = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      middlewares[_key - 1] = arguments[_key];
    }

    this.store = (0, _redux.createStore)(reducer, composeEnhancers(_redux.applyMiddleware.apply(void 0, [_asyncMiddleware["default"]].concat(middlewares))));
    this.store.subscribe(this.storeUpdated);
    this.listeners = [];
    this.trigger = true;
  }

  (0, _createClass2["default"])(Store, [{
    key: "batchDispatch",
    value: function batchDispatch(actions) {
      this.trigger = false;
      var lastState = this.getState();
      actions.forEach(this.dispatch);
      this.trigger = true;

      if (lastState !== this.getState()) {
        this.storeUpdated();
      }
    }
  }]);
  return Store;
}();

var _default = Store;
exports["default"] = _default;