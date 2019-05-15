import handleActions from './handleActions';

function createFetchDuck(prefix, fetcher, item) {

  const REQUEST = `${prefix}/${item}_REQUEST`;
  const SUCCESS = `${prefix}/${item}_SUCCESS`;
  const FAILURE = `${prefix}/${item}_FAILURE`;

  const fetchAction = (payload) => ({
    types: [REQUEST, SUCCESS, FAILURE],
    promise: () => fetcher(payload)
  });

  const initialState = {isFetching: false, response: null};

  const reducer = handleActions(initialState, {
    [REQUEST]: (state) => ({...state, isFetching: true}),
    [FAILURE]: () => initialState,
    [SUCCESS]: (state, action) => ({
      ...state,
      response: action.payload,
      isFetching: false,
    })
  });

  return {fetchAction, reducer};
}

export default createFetchDuck;
