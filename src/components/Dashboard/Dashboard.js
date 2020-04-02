import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import ActivityList from '../MyList/MyList'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import ActivityService from '../services/activity-service'

export default class Dashboard extends Component {
  
  
  
  static contextType = ActivityContext;
  constructor(props) {
    super(props);

    this.state = {
      activityGenerated: false,
      activitySelected: true,
      activities: [],
      randomIndex: 0,
      categories: []
    }
  }

  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {  
    this.createRandomIndex()
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
  }

  acceptRandomActivity = () => {
    console.log('Random activity accepted :)')
    this.setState({
      activityGenerated: false,
      activitySelected: true
    })
    ActivityService.updateActivity(
      this.context.activities[this.state.randomIndex].id,
      {
        name: this.context.activities[this.state.randomIndex].name,
        description: this.context.activities[this.state.randomIndex].description,
        is_accepted: true,
        is_rejected: false
      })
      .then(res => this.context.fetchContextActivities())


  }

  declineRandomActivity = () => {
    console.log('Random activity declined :(')
    ActivityService.updateActivity(
      this.context.activities[this.state.randomIndex].id,
      {
        name: this.context.activities[this.state.randomIndex].name,
        description: this.context.activities[this.state.randomIndex].description,
        is_accepted: false,
        is_rejected: true
      })
      .then(res => this.context.fetchContextActivities())
    this.getRandomActivity()
  }

  createRandomIndex = () => {
    let randomActivityIndex = 0;
    randomActivityIndex = this.context.activities[0]
      ? [Math.floor(Math.random() * this.context.activities.length)] 
      : 0;

    this.setState({
      randomIndex: randomActivityIndex
    })
  }

  lastDecision = () => {
    if (this.context.activities[this.state.randomIndex].is_rejected && !this.context.activities[this.state.randomIndex].is_accepted) {
      console.log('rejected')
      return 'rejected'
    }
    else if (!this.context.activities[this.state.randomIndex].is_rejected && this.context.activities[this.state.randomIndex].is_accepted) {
      console.log('accepted')
      return 'accepted'
    }
    else {
      console.log('neither')
      return 'neither accepted nor rejected'
    }

  }

  componentDidMount() {
    this.context.fetchContextActivities()
    this.setState({
      activityGenerated: false,
      activitySelected: false
    })
    ActivityService.fetchCategories()
      .then(res => this.setState({
        categories: res
      }))
  }

  render() {
    console.log(this.state.categories)
    return (
      <div className="activity-form" id="form-wrapper">
        {/* <div className="test-context">
          Hi, this will have context if it is working:
          {this.context.activities[0] ? this.context.activities[0].name : 'context is not working'}
        </div> */}
        <button className="get-random-button button-primary" onClick={this.getRandomActivity}>
          Random Activity Please!
        </button>
        
        <section className='result-wrapper'>
        <div className="display-chosen-activity">
          {this.state.activitySelected && this.context.activities[0] 
            ? `You have chosen "${this.context.activities[this.state.randomIndex].name}."  Enjoy!`
            : ''}
        </div>
        <div className="display-random-activity">
          <p>{this.context.activities && this.state.activityGenerated
            ? `Your random activity is: ${this.context.activities[this.state.randomIndex].name}`        
            : ''}</p>
          <p>
          {this.context.activities && this.state.activityGenerated
            ? `The description is: ${this.context.activities[this.state.randomIndex].description}`        
            : ''}
          </p>
          <p>
          {this.context.activities && this.state.activityGenerated
            ? `Last time you ${this.lastDecision()} this choice`        
            : ''}
          </p>
        <div className="button-group">
          
          {this.state.activityGenerated && <button className="button-primary" onClick={this.acceptRandomActivity}>Accept</button>}
          {this.state.activityGenerated && <button className="button-cancel" onClick={this.declineRandomActivity}>Decline</button>}
        </div>
        
        </div>
        <ActivityList />
        </section>
      </div>
    )
  }
}

Dashboard.defaultProps = {
  activities: []
}
