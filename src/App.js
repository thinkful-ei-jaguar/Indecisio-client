import React, { Component } from 'react';
import Dashboard from './Dashboard';
import config from './config'
import ActivityForm from './components/ActivityForm/ActivityForm';
import ActivityContext from './contexts/ActivityContext'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activities: [
        {name: 'none', description: 'none'}
      ]
    }
  }

  fetchActivities = () => {
    fetch(`${config.API_ENDPOINT}/activity`, {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then(res=>res.json())
      .then(response => {
        this.setState({
          activities: response
        })
      })
  }

  propsToPass = {
    fetchActivities: this.fetchActivities
  }

  componentDidMount() {
    this.fetchActivities()
  }

  render() {
  return (
    <main className='App'>
      <Dashboard {...this.propsToPass} state={this.state} />
      <ActivityForm />
    </main>
  );
  
  }
}

export default App;

