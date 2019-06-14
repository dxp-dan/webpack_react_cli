import { createAction } from 'redux-actions';
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, delay, filter, takeUntil   } from 'rxjs/operators';
import { ansyHandleFactory, handleActions } from '../../../utils/actionFactory';
import { createAsyncAction } from '../../../utils/request';


const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED';

const fetchUser = username => ({ type: FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });


const fetchUserFAction = ansyHandleFactory('LIC-DET');

// export const fetchUserEpic = action$ => action$.pipe(
//   ofType(FETCH_USER),
//   mergeMap(action =>
//     ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
//       map(response => fetchUserFulfilled(response))
//     )
//   )
// );

//取消一些异步行为 .takeUnitl()
export const fetchUserEpic = action$ => action$.pipe(
  ofType(FETCH_USER),
  mergeMap(action => ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
    map(response => fetchUserFulfilled(response)),
    takeUntil(action$.pipe(
      ofType(FETCH_USER_CANCELLED)
    ))
  ))
);

//取消然后做一些其他的事情 (发出另一个 Action)
// const fetchUserEpic = action$ => action$.pipe(
//   ofType(FETCH_USER),
//   mergeMap(action => race(
//     ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
//       map(response => fetchUserFulfilled(response))
//     ),
//     action$.pipe(
//       ofType(FETCH_USER_CANCELLED),
//       map(() => incrementCounter()),
//       take(1)
//     )
//   ))
// );

const initialState = {
  login: {},
  flogin: {},
  loginLoading: false,
  floginLoading: false,
};

const fetchReducer = handleActions(
  {
    [FETCH_USER]:(state,action) => {
      return {...state, loginLoading: true }
    },
    [FETCH_USER_FULFILLED]:(state,action) => {
      return {...state, login: action.payload, loginLoading: false }
    },
    [FETCH_USER_CANCELLED]:(state,action) => {
      return {...state, loginLoading: false }
    },
  },
  fetchUserFAction('GET', {
    pending: (state, action) => ({
      ...state,
      floginLoading: true,
    }),
    accept: (state, action) => ({
      ...state,
      flogin: action.payload,
      floginLoading: false,
    }),
    reject: (state, action) => ({
      ...state,
    }),
  }),
  initialState
);

export default fetchReducer;

export const fetchUserA = createAction(FETCH_USER);

export const fetchUserACancel = createAction(FETCH_USER_CANCELLED);


export const fetchUserF = payload => createAsyncAction(
  `https://api.github.com/users/${payload}`,
  fetchUserFAction('GET')
)();