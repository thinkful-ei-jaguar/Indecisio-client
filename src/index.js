import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import { ActivityProvider } from './components/contexts/ActivityContext'

ReactDOM.render(
    <BrowserRouter>
    <ActivityProvider>
      <App />
    </ActivityProvider>
    </BrowserRouter>, 

document.getElementById('root'));

