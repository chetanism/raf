function createListToObj(argsName) {
  return function(...args) {
    return argsName.reduce((obj, name, idx) => {
      obj[name] = args[idx];
      return obj;
    }, {})
  }
}

function createAction(type, payloadGeneratorOrArgList) {
  let payloadGenerator = x => x;

  if (Array.isArray(payloadGeneratorOrArgList)) {
    payloadGenerator = createListToObj(payloadGeneratorOrArgList)
  } else if(payloadGeneratorOrArgList instanceof Function) {
    payloadGenerator = payloadGeneratorOrArgList;
  }

  return (...args) => ({
    type,
    payload: payloadGenerator(...args)
  })
}

export default createAction;
