import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import pingReducer, { pingEpic } from './demo/demo01';
import fetchReducer, { fetchUserEpic } from './demo/demo02';
import incrementIfOddReducer, { incrementIfOddEpic } from './demo/demo03';

export const rootEpic = combineEpics(
  pingEpic,
  fetchUserEpic,
  incrementIfOddEpic,
);

export const rootReducer = combineReducers({
  pingReducer,
  fetchReducer,
  incrementIfOddReducer
});