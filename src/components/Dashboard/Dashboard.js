import React, { Component } from 'react';
import config from '../../config';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityGenerated: false,
      activities: []
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
  
  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {
    console.log(this.state.activities)
    this.toggleActivityGenerated()
  }

  acceptRandomActivity = () => {
    console.log('Random activity accepted :)')
    this.setState({
      activityGenerated: false
    })
  }

  declineRandomActivity = () => {
    console.log('Random activity declined :(')
    this.setState({
      activityGenerated: false
    })
  }

  componentDidMount() {
    this.fetchActivities()
    this.setState({
      activityGenerated: false
    })
  }

  render() {
    let randomActivityIndex = 0;
    randomActivityIndex = this.state ? [Math.floor(Math.random() * this.state.activities.length)] : 0;
    
    return (
      <div>
        <h1>Indecisio</h1>
        <button onClick={this.getRandomActivity}>
          Random Activity Please!
        </button>
        <div className="display-random-activity">
          <p>{this.state.activities && this.state.activityGenerated
          ? `Your random activity is: ${this.props.state.activities[randomActivityIndex].name}`        
          : ''}</p>
          <p>
          {this.state.activities && this.state.activityGenerated
          ? `The description is: ${this.state.activities[randomActivityIndex].description}`        
          : ''}
          </p>
        {this.state.activityGenerated && <button onClick={this.acceptRandomActivity}>Accept</button>}
        {this.state.activityGenerated && <button onClick={this.declineRandomActivity}>Decline</button>}
        </div>
      </div>
    )
  }
}

Dashboard.defaultProps = {
  activities: []
}
