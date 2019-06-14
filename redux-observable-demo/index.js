import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DatePicker } from 'antd';
import configureStore from './src/redux/store/configureStore';
import Demo01 from './src/containers/demo01/index';
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <div>
        <Demo01 store={store} />
      </div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
