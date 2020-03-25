import React, { Component } from 'react';
import Dashboard from './Dashboard';
import config from './config'
import ActivityForm from './components/ActivityForm/ActivityForm';
import ActivityContext from './contexts/ActivityContext'

class App extends Component {

  render() {
  return (
    
    <main className='App'>
      <Dashboard />
      <ActivityForm />
    </main>
  );
  
  }
}

export default App;

