// make React available
import React from 'react';

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';

// make the App component available
import App from './App';
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom'
import ActivityList from './components/ActivityList/ActivityList';
import ActivityForm from './components/ActivityForm/ActivityForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

// this is the test case

describe('Smoke testing components', () => {
  
  it('renders App without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
  
    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , div);
  
    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders Dashboard without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders ActivityList without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <ActivityList />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders ActivityForm without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <ActivityForm />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LoginForm without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders RegistrationForm without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders everything without exploding', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    
    
    ReactDOM.render(
      <BrowserRouter>
        <App />
        <Dashboard />
        <ActivityList />
        <RegistrationForm />
        <LoginForm />
        <ActivityForm />
      </BrowserRouter>
      , div);
    
    ReactDOM.unmountComponentAtNode(div);
  });
})
