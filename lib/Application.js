"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Application =
/*#__PURE__*/
function () {
  function Application(store, router, renderer, sideEffect) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Application);
    (0, _defineProperty2["default"])(this, "update", function () {
      return _this.renderer.render()["catch"](function (error) {
        return console.log(error);
      });
    });
    this.store = store;
    this.router = router;
    this.renderer = renderer;
    this.sideEffect = sideEffect;
  }

  (0, _createClass2["default"])(Application, [{
    key: "start",
    value: function start() {
      this.store.start(this.update);
      this.router.start();
      this.sideEffect.triggerBoot(this.store);
      console.log('Application Started!');
    }
  }]);
  return Application;
}();

var _default = Application;
exports["default"] = _default;