"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _index = require("../index");

var _react = _interopRequireWildcard(require("react"));

function withServices() {
  for (var _len = arguments.length, services = new Array(_len), _key = 0; _key < _len; _key++) {
    services[_key] = arguments[_key];
  }

  return function (SomeComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2["default"])(SomeComponentWithServices, _Component);

      function SomeComponentWithServices() {
        (0, _classCallCheck2["default"])(this, SomeComponentWithServices);
        return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SomeComponentWithServices).apply(this, arguments));
      }

      (0, _createClass2["default"])(SomeComponentWithServices, [{
        key: "render",
        value: function render() {
          var container = this.context;
          this.servicesToInject = services.reduce(function (obj, service) {
            obj[service] = container.get(service);
            return obj;
          }, {});
          return _react["default"].createElement(SomeComponent, (0, _extends2["default"])({}, this.props, this.servicesToInject));
        }
      }]);
      return SomeComponentWithServices;
    }(_react.Component), (0, _defineProperty2["default"])(_class, "contextType", _index.ContainerContext), _temp;
  };
}

var _default = withServices;
exports["default"] = _default;