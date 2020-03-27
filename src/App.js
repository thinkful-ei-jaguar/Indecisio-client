import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute'
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
      <header>
      <NavBar />
      </header>
      <Switch>
        <PublicOnlyRoute
          exact
          path={'/'}
          component={RegistrationForm}
        />
        <PublicOnlyRoute
          exact
          path={'/login'}
          component={LoginForm}
        />
        <PrivateRoute 
          path={'/dashboard'}
          component={Dashboard}/>
        <PrivateRoute
          path={'/add-activity'}
          component={ActivityForm}/>
      </Switch>
    </main>
  );
  }
}

export default App;

