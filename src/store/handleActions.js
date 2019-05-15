function handleActions(initialState, handlers) {
  return function(state = initialState, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  }
}

export default handleActions;
