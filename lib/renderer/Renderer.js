"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(store, router, element, container, RootComponent) {
    (0, _classCallCheck2["default"])(this, Renderer);
    this.currentRouterState = null;
    this.router = router;
    this.element = element;
    this.store = store;
    this.container = container;
    this.RootComponent = RootComponent;
  }

  (0, _createClass2["default"])(Renderer, [{
    key: "start",
    value: function start() {
      this.store.subscribe(this.render.bind(this));
    }
  }, {
    key: "render",
    value: function () {
      var _render = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var routerState, page;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                routerState = this.store.getState().router;

                if (!(routerState !== this.currentRouterState)) {
                  _context.next = 9;
                  break;
                }

                this.currentRouterState = routerState;
                _context.next = 5;
                return this.router.resolve((0, _objectSpread2["default"])({}, routerState, {
                  store: this.store
                }));

              case 5:
                page = _context.sent;

                if (!page.redirect) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", this.router.setLocation(page.redirect));

              case 8:
                _reactDom["default"].render(_react["default"].createElement(Renderer.ContainerContext.Provider, {
                  value: this.container
                }, _react["default"].createElement(this.RootComponent, null, page.component)), this.element);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return Renderer;
}();

Renderer.ContainerContext = _react["default"].createContext(null);
var _default = Renderer;
exports["default"] = _default;