"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Application =
/*#__PURE__*/
function () {
  function Application(store, router, renderer, sideEffect) {
    (0, _classCallCheck2["default"])(this, Application);
    this.store = store;
    this.router = router;
    this.renderer = renderer;
    this.sideEffect = sideEffect;
  }

  (0, _createClass2["default"])(Application, [{
    key: "start",
    value: function start() {
      // this.store.start(this.update);
      this.router.start();
      this.renderer.start();
      this.sideEffect.triggerBoot(this.store);
      console.log('Application Started!');
    } // update = () => this.renderer.render()
    //   .catch(error => console.log(error));

  }]);
  return Application;
}();

var _default = Application;
exports["default"] = _default;