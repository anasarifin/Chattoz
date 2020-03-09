import {combineReducers} from 'redux';
import getUser from './user';

const reducers = combineReducers({
  user: getUser,
});

export default reducers;
