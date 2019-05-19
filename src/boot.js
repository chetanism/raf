import Application from './Application';
import Store from './store/Store';
import Router from './router/Router';
import Renderer from './renderer/Renderer';
import {combineReducers} from 'redux';
import SideEffect from './store/sideEffects';
import {ctor, factory, value, Container} from './dilite/Dilite';


const config = {
  app: ctor(
    Application,
    ['store', 'router', 'renderer', 'sideEffect']
  ),

  sideEffect: ctor(SideEffect),

  store: factory(
    (appReducer, sideEffect) => {

      const rootReducer = combineReducers({
        app: appReducer,
        router: Router.reducer
      });

      return new Store(rootReducer, Router.middleware, sideEffect.getMiddleware());
    },
    ['__appReducer', 'sideEffect']
  ),

  router: factory(
    (store, routes) => new Router(routes, store),
    ['store', 'routes']
  ),

  renderer: factory(
    (store, router, container, RootComponent) => new Renderer(
      store, router, document.getElementById('root'), container, RootComponent),
    ['store', 'router', 'container', 'rootComponent']
  )
};

export function createApplication(services, appReducer) {
  const allConfigs = {
    __appReducer: value(appReducer),
    ...config,
    ...services
  };

  const container = new Container(allConfigs);
  return {
    app: container.get('app'),
    container
  };
}