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

    this.store.subscribe(this.storeUpdated);
    this.listeners = [];
    this.trigger = true;
  }

  getState = () => this.store.getState();

  dispatch = (...args) => this.store.dispatch(...args);

  storeUpdated = () => {
    if (this.trigger) {
      this.listeners.forEach(listener => listener())
    }
  };

  batchDispatch(actions) {
    this.trigger = false;
    const lastState = this.getState();
    actions.forEach(this.dispatch);
    this.trigger = true;
    if(lastState !== this.getState()) {
      this.storeUpdated();
    }
  }

  subscribe = (listener) => {
    this.listeners.push(listener);

    return () => {
      const idx = this.listeners.indexOf(listener);
      this.listeners.splice(idx, 1)
    }
  };
}

export default Store;
