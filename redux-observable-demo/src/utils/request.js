import { message } from 'antd';
import { actionFactory } from './actionFactory';

const messageByCode = errCode => {
  try {
    const codeLevel = errCode.toString()[0];
    let msgOut = message.info;
    switch (codeLevel) {
      case '0':
        msgOut = message.success;
        break;
      case '2':
        msgOut = message.warning;
        break;
      case '1':
      case '3':
        msgOut = message.error;
        break;
      default:
        break;
    }

    return msgOut;
  } catch (error) {
    return msg => msg;
  }
};

const config = {
  commonParams() {
    return {};
  },
  handleStatus(resp) {
    const { code, data, message: msg } = resp;
    if (code === 0) {
      return resp;
    }
    messageByCode(code)(msg);
    return resp;
  },
};

const createAsyncAction = actionFactory(config);

export { createAsyncAction };
