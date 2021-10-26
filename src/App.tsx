import React from 'react';
import { Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.less';
import HomePage from './containers/HomePage';

function App() {
  return (
    <div className='container'>
      <Route path={`/`} exact key='/' component={HomePage} />
    </div>
  );
}

export default App;
