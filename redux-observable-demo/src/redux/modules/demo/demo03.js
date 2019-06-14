import { createAction } from 'redux-actions';
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, mapTo, tap, mergeMap, delay, filter, switchMap, concatMap   } from 'rxjs/operators';
import { ansyHandleFactory, handleActions } from '../../../utils/actionFactory';
import { createAsyncAction } from '../../../utils/request';

const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

export const incrementIfOddEpic = (action$, state$) => action$.pipe(
  ofType(INCREMENT_IF_ODD),
  filter(() => state$.value.incrementIfOddReducer.count % 2 === 1),
  map(() => increment())
);


const initialState = {
  count: 0
};

const incrementIfOddReducer = handleActions(
  {
    [INCREMENT]:(state,action) => {
      const count = state.count+1;
    return {...state, count}
    }
  },
  initialState
);

export default incrementIfOddReducer;

export const incrementOd = createAction(INCREMENT);

export const incrementIfOd = createAction(INCREMENT_IF_ODD);

