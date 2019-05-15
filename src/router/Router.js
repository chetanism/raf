import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import middleware, {history} from './reduxMiddleware';

import {routerReducer, startListener, push} from 'redux-first-routing';


class Router {
  constructor(routes, store) {
    this.store = store;

    this.router = new UniversalRouter(routes.getRoutes(), {
      resolveRoute(context, params) {
        const guards = context.route.guards || [];

        for(const guard of guards) {
          const resp = guard(context, params);
          if (resp) {
            return resp;
          }
        }

        if (typeof context.route.controller === 'function') {
          return context.route.controller(context, params)
        } else if (typeof context.route.render === 'object') {
          return context.route.render;
        }
        return undefined
      },
    });

    this.urlGenerator = generateUrls(this.router, {
      stringifyQueryParams(params) {
        return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
      },
    });
  }

  start() {
    startListener(history, this.store.store);
  }

  async resolve(contextOrPathname) {
    let ctx = typeof contextOrPathname === 'object' ? contextOrPathname : {pathname: contextOrPathname};
    return this.router.resolve(ctx);
  }

  getUrl(name, params) {
    return this.urlGenerator(name, params);
  }

  setLocation(url) {
    this.store.dispatch(push(url));
  }
}

Router.reducer = routerReducer;
Router.middleware = middleware;

export default Router;
