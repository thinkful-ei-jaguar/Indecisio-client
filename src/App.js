import React, { Component } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import ActivityForm from './components/ActivityForm/ActivityForm';

/**
 * We could probably change App to be a functional component -Blade 03-25-20
 */
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

