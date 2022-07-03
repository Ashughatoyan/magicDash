import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import {SimpleTabs} from './TabComponent';
import LoginContainer from './Pages/Login';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <SimpleTabs/>
        <LoginContainer/>
      </header>
    </div>
  );
}

export default App;
