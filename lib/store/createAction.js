"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function createListToObj(argsName) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return argsName.reduce(function (obj, name, idx) {
      obj[name] = args[idx];
      return obj;
    }, {});
  };
}

function createAction(type, payloadGeneratorOrArgList) {
  var payloadGenerator = function payloadGenerator(x) {
    return x;
  };

  if (Array.isArray(payloadGeneratorOrArgList)) {
    payloadGenerator = createListToObj(payloadGeneratorOrArgList);
  } else if (payloadGeneratorOrArgList instanceof Function) {
    payloadGenerator = payloadGeneratorOrArgList;
  }

  return function () {
    return {
      type: type,
      payload: payloadGenerator.apply(void 0, arguments)
    };
  };
}

var _default = createAction;
exports["default"] = _default;