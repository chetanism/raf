"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _universalRouter = _interopRequireDefault(require("universal-router"));

var _generateUrls = _interopRequireDefault(require("universal-router/generateUrls"));

var _reduxMiddleware = _interopRequireWildcard(require("./reduxMiddleware"));

var _reduxFirstRouting = require("redux-first-routing");

var Router =
/*#__PURE__*/
function () {
  function Router(routes, store) {
    (0, _classCallCheck2["default"])(this, Router);
    this.store = store;
    this.router = new _universalRouter["default"](routes.getRoutes(), {
      resolveRoute: function resolveRoute(context, params) {
        var guards = context.route.guards || [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = guards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var guard = _step.value;
            var resp = guard(context, params);

            if (resp) {
              return resp;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (typeof context.route.controller === 'function') {
          return context.route.controller(context, params);
        } else if ((0, _typeof2["default"])(context.route.render) === 'object') {
          return context.route.render;
        }

        return undefined;
      }
    });
    this.urlGenerator = (0, _generateUrls["default"])(this.router, {
      stringifyQueryParams: function stringifyQueryParams(params) {
        return Object.keys(params).map(function (key) {
          return "".concat(key, "=").concat(params[key]);
        }).join('&');
      }
    });
  }

  (0, _createClass2["default"])(Router, [{
    key: "start",
    value: function start() {
      (0, _reduxFirstRouting.startListener)(_reduxMiddleware.history, this.store.store);
    }
  }, {
    key: "resolve",
    value: function () {
      var _resolve = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(contextOrPathname) {
        var ctx;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ctx = (0, _typeof2["default"])(contextOrPathname) === 'object' ? contextOrPathname : {
                  pathname: contextOrPathname
                };
                return _context.abrupt("return", this.router.resolve(ctx));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolve(_x) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  }, {
    key: "getUrl",
    value: function getUrl(name, params) {
      return this.urlGenerator(name, params);
    }
  }, {
    key: "setLocation",
    value: function setLocation(url) {
      this.store.dispatch((0, _reduxFirstRouting.push)(url));
    }
  }]);
  return Router;
}();

Router.reducer = _reduxFirstRouting.routerReducer;
Router.middleware = _reduxMiddleware["default"];
var _default = Router;
exports["default"] = _default;