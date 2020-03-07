import {createStore, applyMiddleware} from 'redux';
// import { createLogger } from "redux-logger";
// import promise from 'redux-promise-middleware';
import reducers from './reducers/index';

// const logger = createLogger();
// const enhancers = applyMiddleware(promise);

const store = createStore(reducers);

export default store;
