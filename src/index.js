import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import { ActivityProvider } from './components/contexts/ActivityContext';
import { UserProvider } from './components/contexts/UserContext';

ReactDOM.render(
    <BrowserRouter>
    <UserProvider>
    <ActivityProvider>
      <App />
    </ActivityProvider>
    </UserProvider>
    </BrowserRouter>, document.getElementById('root'));

