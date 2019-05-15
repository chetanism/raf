import {createStore, applyMiddleware, compose} from 'redux';
import asyncMiddleware from './asyncMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

class Store {
  constructor(reducer, ...middlewares) {
    this.store = createStore(
      reducer,
      composeEnhancers(applyMiddleware(
        asyncMiddleware,
        ...middlewares
      )),
    );
  }

  getState = () => this.store.getState();
  dispatch = (...args) => this.store.dispatch(...args);
  subscribe = (...args) => this.store.subscribe(...args);

  start(listener) {
    this.store.subscribe(listener);
  }
}

export default Store;
