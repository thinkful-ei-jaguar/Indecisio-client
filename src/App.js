import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute'
import Dashboard from './components/Dashboard/Dashboard';
import ActivityForm from './components/ActivityForm/ActivityForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import AppHeader from './components/AppHeader/AppHeader';
import TopActivities from './components/TopActivities/TopActivities';
import UserContext from './components/contexts/UserContext';
/**
 * We could probably change App to be a functional component -Blade 03-25-20
 */
export default class App extends Component {
  static contextType = UserContext;
  render () {
  console.log('user from context:', this.context.user.id)
  
  return (
    <main className='App'>
      <AppHeader />
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
          component={() => <Dashboard user={this.context.user.id}/>}
        />
    
        <PrivateRoute
          path={'/add-activity'}
          component={ActivityForm}/>

        <Route
          path={'/top-activities'}
          component={TopActivities}/>
      </Switch>
        <NavBar />
    </main>
  );
  }
}

