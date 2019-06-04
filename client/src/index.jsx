import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from '@hot-loader/react-dom';
import App from './App';

setConfig({
  reloadHooks: false,
});

ReactDOM.render(<App />, document.getElementById('root'));
