"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _withServices = _interopRequireDefault(require("./withServices"));

function Link(_ref) {
  var to = _ref.to,
      onClick = _ref.onClick,
      children = _ref.children,
      router = _ref.router,
      others = (0, _objectWithoutProperties2["default"])(_ref, ["to", "onClick", "children", "router"]);

  function onLinkClick(event) {
    if (onClick) {
      onClick(event);
    }

    if (event.isDefaultPrevented()) {
      return;
    }

    event.preventDefault();
    router.setLocation(to);
  }

  return _react["default"].createElement("a", (0, _extends2["default"])({
    href: to,
    onClick: onLinkClick
  }, others), children);
}

var _default = (0, _withServices["default"])('router')(Link);

exports["default"] = _default;