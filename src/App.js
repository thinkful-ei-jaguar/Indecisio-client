import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
//import PrivateRoute from './components/PrivateRoute'
//import PublicOnlyRoute from '../src/components/PublicOnlyRoute/PublicOnlyRoute'
import Dashboard from './components/Dashboard/Dashboard';
import ActivityForm from './components/ActivityForm/ActivityForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';

/**
 * We could probably change App to be a functional component -Blade 03-25-20
 */
class App extends Component {

  render() {
  return (
    <main className='App'>
      <Switch>
        <Route
          exact
          path={'/'}
          component={RegistrationForm}
        />
        <Route
          exact
          path={'/login'}
          component={LoginForm}
        />
        <Route 
          path={'/dashboard'}
          component={Dashboard}/>
        <Route
          path={'/add-activity'}
          component={ActivityForm}/>
      </Switch>
    </main>
  );
  }
}

export default App;

