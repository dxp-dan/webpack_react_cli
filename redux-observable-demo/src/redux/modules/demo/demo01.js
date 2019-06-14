import { handleActions, createAction } from 'redux-actions';
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { map, mapTo, tap, mergeMap, delay, filter, scan, throttleTime, multicast, refCount, debounce, debounceTime, catchError, switchMap, concatMap   } from 'rxjs/operators';

const PING = 'PING';
const PONG = 'PONG';

export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });

export const pingEpic = action$ => action$.pipe(
  ofType(PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(pong())
);

const initialState = {
  isPinging: false,
};

const pingReducer = handleActions(
  {
    [PING]:(state,action) => {
          return {...state, isPinging: true}
    },
    [PONG]:(state,action)=>{   
        return  {...state, isPinging: false};
    }
  },
  initialState
);

export default pingReducer;

export const toPing: () => any = createAction(PING);