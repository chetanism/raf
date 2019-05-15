"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function on(listeners, actionType, listener) {
  if (!listeners[actionType]) {
    listeners[actionType] = [];
  }

  listeners[actionType].push(listener);
}

var SideEffect =
/*#__PURE__*/
function () {
  function SideEffect() {
    (0, _classCallCheck2["default"])(this, SideEffect);
    this.preListeners = {};
    this.postListeners = {};
    this.bootListeners = {
      boot: []
    };
    this.booted = false;
  }

  (0, _createClass2["default"])(SideEffect, [{
    key: "triggerBoot",
    value: function triggerBoot(store) {
      this.bootListeners.boot.forEach(function (l) {
        return l(store);
      });
      this.booted = true;
    }
  }, {
    key: "boot",
    value: function boot(listener) {
      on(this.bootListeners, 'boot', listener);
    }
  }, {
    key: "before",
    value: function before(actionType, listener) {
      on(this.preListeners, actionType, listener);
    }
  }, {
    key: "after",
    value: function after(actionType, listener) {
      on(this.postListeners, actionType, listener);
    }
  }, {
    key: "getMiddleware",
    value: function getMiddleware() {
      var _this = this;

      return function (store) {
        return function (next) {
          return function (action) {
            if (_this.preListeners[action.type]) {
              _this.preListeners[action.type].forEach(function (l) {
                return l(action.payload, store);
              });
            }

            next(action);

            if (_this.postListeners[action.type]) {
              _this.postListeners[action.type].forEach(function (l) {
                return l(action.payload, store);
              });
            }
          };
        };
      };
    }
  }]);
  return SideEffect;
}(); // export default new SideEffect();


var _default = SideEffect;
exports["default"] = _default;