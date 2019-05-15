import Application from './Application';

import createDuck from './store/createDuck';
import sideEffects from './store/sideEffects';
import handleActions from './store/handleActions';
import createAction from './store/createAction';
import createFetchDuck from './store/createFetchDuck';
import Store from './store/Store';

import {push, goBack, goForward} from 'redux-first-routing';
import Router from './router/Router';

import Link from './components/Link';
import Renderer from './renderer/Renderer';
import withServices from './components/withServices';


export {
  Application
}

export const components = {
  Link,
  withServices
};

export const ContainerContext = Renderer.ContainerContext;

export const store = {
  createAction,
  handleActions,
  createFetchDuck,
  createDuck,
  sideEffects,
  Store
};

export const router = {
  goto: push,
  goBack,
  goForward,
  Router
};
