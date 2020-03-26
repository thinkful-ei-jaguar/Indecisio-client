import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ActivityProvider } from './contexts/ActivityContext'

ReactDOM.render(

<ActivityProvider>
  <App />
</ActivityProvider>, 

document.getElementById('root'));
