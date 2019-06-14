import fetch from 'isomorphic-fetch';
import * as reduxActions from 'redux-actions';
import { message } from 'antd';

const { createAction, handleActions: oldHandleActions } = reduxActions;


function createActionType(type){
  return {
    pending: `${type} pending`,
    accept: `${type} accept`,
    reject: `${type} reject`,
    type,
  };
}

function getHeaders() {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('content-type', 'application/json; charset=utf-8');
  return headers;
}

function fetchApi(options, timeout) {
  const { url, param } = options;
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('请求超时'), timeout);
    fetch(url, param).then(resolve, reject);
  });
}

function handleResponse(resp) {
  const { status, ok } = resp;
  if (ok) {
    return resp.json();
  }
  if (status === 401) {
    message.info('页面过期，请刷新页面或重新登录');
  }
  const error = new Error(`${status} ${resp.statusText}`);
  throw error;
}

function postParams(data) {
  return JSON.stringify(data);
}
function getParams(data) {
  const params = [];
  Object.keys(data).forEach((item, index) => {
    if (Object.prototype.toString.call(data[item]) === '[object Array]') {
      data[item].forEach((node, index) => {
        params.push(`${item}[${index}]=${encodeURIComponent(node)}`);
      });
      return;
    }
    params.push(`${item}=${encodeURIComponent(data[item])}`);
  });
  return params.length > 0 ? `?${params.join('&')}` : '';
}

function handleMethod(method = 'POST',data,api){
  let defaultValue;
  const url = `${api}`;
  switch (method) {
    case 'GET': {
      defaultValue = {
        url: `${url}${getParams(data)}`,
        param: {
          method: 'GET',
          credentials: 'same-origin',
          headers: getHeaders(),
        },
      };
      break;
    }
    case 'POST':
    case 'PUT':
    case 'DELETE': {
      const headers = getHeaders();
      const param = {
        method,
        credentials: 'same-origin',
        body: postParams(data),
        headers,
      };
      defaultValue = { url, param };
      break;
    }
    default: {
      defaultValue = { url: '', param: {} };
      break;
    }
  }
  return defaultValue;
}

function createAsyncAction(getCommonParams,handleStatus,api,actions,method) {
  // 三种状态的action
  const action = actions === 'string'
      ? createActionType(actions)
      : actions.actionType || actions;
  const [pending, accept, reject] = Object.keys(action).map(item =>
    createAction(action[item])
  );

  return (obj, rj) => dispatch => {
    dispatch(pending());
    const req = handleMethod(
      actions.method || method,
      { ...obj, ...getCommonParams() },
      api
    );

    return fetchApi(req, 15000)
      .then(response => handleResponse(response))
      .then(data => {
        data = handleStatus(data);
        dispatch(accept(data));
        return data;
      })
      .catch(err => {
        rj && rj(err);
        dispatch(reject());
        console.error(err);
        return STOPPER_PROMISE;
      });
  };
}

export const handleActions = (...args) => {
  const obj = {};
  const { length } = args;
  const initialState = args[length - 1];
  for (let i = 0; i < length - 1; i += 1) {
    Object.keys(args[i]).map(item => {
      obj[item] = args[i][item];
    });
  }
  console.log('obj', obj);
  return oldHandleActions(obj, initialState);
}

export const ansyHandleFactory = name => (method,newReducers) => {
  const actionType = createActionType(`${method}_${name}`);
  if (newReducers) {
    const obj = {
      [actionType.pending]:
        newReducers.pending || (state => ({ ...state, loading: true })),
      [actionType.reject]:
        newReducers.reject || (state => ({ ...state, loading: false })),
      [actionType.accept]:
        newReducers.accept || (state => ({ ...state, loading: false })),
    };
    return obj;
  }
  return { actionType, method };
};

export const actionFactory = (config) => {
  const { commonParams = () => ({}), handleStatus = res => res } = config;
  return (api,actions,method) => createAsyncAction(commonParams, handleStatus, api, actions, method);
}