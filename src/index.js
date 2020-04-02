import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import { ActivityProvider } from './components/contexts/ActivityContext';
import { UserProvider } from './components/contexts/UserContext';
import { ThemeProvider } from './components/contexts/ThemeContext';


ReactDOM.render(
    <BrowserRouter>
    <UserProvider>
    <ActivityProvider>
        <ThemeProvider>
      <App />
        </ThemeProvider>
    </ActivityProvider>
    </UserProvider>
    </BrowserRouter>, document.getElementById('root'));

