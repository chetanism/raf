import {createBrowserHistory, routerMiddleware} from 'redux-first-routing';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export default middleware;
export {history};
