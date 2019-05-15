"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctor = ctor;
exports.factory = factory;
exports.value = value;
exports["default"] = exports.Container = exports.DiliteError = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var DiliteError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(DiliteError, _Error);

  function DiliteError(msg) {
    (0, _classCallCheck2["default"])(this, DiliteError);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DiliteError).call(this, "Dilite: ".concat(msg)));
  }

  return DiliteError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.DiliteError = DiliteError;

function factory(factory, inject, setter) {
  return {
    type: 'factory',
    factory: factory,
    inject: inject,
    setter: setter
  };
}

function value(value) {
  return {
    type: 'value',
    value: value
  };
}

function ctor(ctor, inject, setter) {
  return {
    type: 'ctor',
    ctor: ctor,
    inject: inject,
    setter: setter
  };
}

function setKeyValue(obj, keyParts, value) {
  var key = keyParts[0];

  if (keyParts.length === 1) {
    obj[key] = value;
    return;
  }

  if (obj[key] === undefined) {
    obj[key] = {};
  }

  setKeyValue(obj[key], keyParts.slice(1), value);
}

function getKeyValue(obj, keyParts) {
  var key = keyParts[0];

  if (keyParts.length === 1) {
    return key === '' ? obj : obj[key];
  }

  if (obj[key] === undefined) {
    return undefined;
  }

  return getKeyValue(obj[key], keyParts.slice(1));
}

var Container =
/*#__PURE__*/
function () {
  function Container() {
    var initializers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Container);
    this.values = {};
    this.cache = {
      container: this
    };
    this.initializers = initializers;
  }

  (0, _createClass2["default"])(Container, [{
    key: "loadServices",
    value: function loadServices(initializers) {
      this.initializers = this.mergeInitializers(this.initializers, initializers, []);
    }
  }, {
    key: "mergeInitializers",
    value: function mergeInitializers(obj1, obj2, path) {
      var obj = {};
      var allKeys = new Set([].concat((0, _toConsumableArray2["default"])(Reflect.ownKeys(obj1)), (0, _toConsumableArray2["default"])(Reflect.ownKeys(obj2))));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = allKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          var nextPath = [].concat((0, _toConsumableArray2["default"])(path), [key]);

          if ((0, _typeof2["default"])(obj1[key]) === 'object' && (0, _typeof2["default"])(obj2[key]) === 'object') {
            obj[key] = this.mergeInitializers(obj1[key], obj2[key], nextPath);
            this.cache[nextPath.join('.')] = undefined;
          } else if (typeof obj1[key] !== 'undefined' && typeof obj2[key] !== 'undefined') {
            throw new DiliteError("Key '".concat(nextPath.join('.'), "' already exists"));
          } else {
            obj[key] = obj2[key] || obj1[key];
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

      return obj;
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this = this;

      var cachedValue = this.cache[key];

      if (cachedValue !== undefined) {
        return cachedValue;
      }

      var setValue = function setValue(key, value) {
        setKeyValue(_this.values, key.split('.'), value);
        _this.cache[key] = value;
        return value;
      };

      var getValue = function getValue(key) {
        return getKeyValue(_this.values, key.split('.'));
      };

      var value = getValue(key);

      if (value !== undefined) {
        this.cache[key] = value;
        return value;
      }

      var initializer = getKeyValue(this.initializers, key.split('.'));

      if (!initializer) {
        throw new DiliteError("Unknown item '".concat(key, "' requested"));
      }

      if (initializer.type === undefined) {
        Reflect.ownKeys(initializer).forEach(function (child) {
          return _this.get("".concat(key, ".").concat(child));
        });

        var _value = getValue(key);

        this.cache[key] = _value;
        return _value;
      }

      if (initializer.type === 'value') {
        return setValue(key, initializer.value);
      }

      var inject = initializer.inject || [];
      var deps = inject.map(function (key) {
        return _this.get(key);
      });
      var instance;

      if (initializer.type === 'ctor') {
        instance = (0, _construct2["default"])(initializer.ctor, (0, _toConsumableArray2["default"])(deps));
        setValue(key, instance);
      }

      if (initializer.type === 'factory') {
        instance = initializer.factory.apply(initializer, (0, _toConsumableArray2["default"])(deps));
        return setValue(key, instance);
      }

      if (initializer.setter) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = initializer.setter[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var depToSet = _step2.value;

            var _depToSet = (0, _slicedToArray2["default"])(depToSet, 2),
                dep = _depToSet[0],
                setter = _depToSet[1];

            instance[setter].call(instance, this.get(dep));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return instance;
    }
  }]);
  return Container;
}();

exports.Container = Container;
var _default = Container;
exports["default"] = _default;