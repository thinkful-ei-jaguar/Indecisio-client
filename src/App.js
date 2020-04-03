import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute'
import Dashboard from './components/Dashboard/Dashboard';
import ActivityForm from './components/ActivityForm/ActivityForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import TopActivites from './components/TopActivities/TopActivities';


/**
 * We could probably change App to be a functional component -Blade 03-25-20
 */
export default function App() {
  return (
    <main className='App'>
      <header id='app-header'>
      
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
        <Route
          path={'/top-activities'}
          component={TopActivites}/>
      </Switch>
    </main>
  );
}

