import {combineReducers} from 'redux';
import getUser from './user';
import getCoordinate from './location';

const reducers = combineReducers({
  user: getUser,
  coordinate: getCoordinate,
});

export default reducers;
