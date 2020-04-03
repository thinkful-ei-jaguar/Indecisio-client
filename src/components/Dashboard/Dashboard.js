import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import MyList from '../MyList/MyList'
import { Link } from 'react-router-dom'
import UserProfile from '../UserProfile/UserProfile'
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
      categories: [],
      filter: ''
    }
  }

  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {  
    if (this.state.filter === '') {
      console.log('Accepted Activity - fetching all categories')
      this.context.fetchContextActivities()
    } else {
      console.log('Accepted Activity - fetching by category:', this.state.filter)
      this.context.fetchContextActivitiesByCategory(this.state.filter)
    }
    this.context.createContextRandomIndex()
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
      this.context.activities[this.context.randomIndex].id,
      {
        name: this.context.activities[this.context.randomIndex].name,
        description: this.context.activities[this.context.randomIndex].description,
        is_accepted: true,
        is_rejected: false
      })
      .then(res => {
        if (this.state.filter === '') {
          console.log('Accepted Activity - fetching all categories')
          this.context.fetchContextActivities()
        } else {
          console.log('Accepted Activity - fetching by category:', this.state.filter)
          this.context.fetchContextActivitiesByCategory(this.state.filter)
        }
      })
  }
  declineRandomActivity = () => {
    console.log('Random activity declined :(')
    ActivityService.updateActivity(
      this.context.activities[this.context.randomIndex].id,
      {
        name: this.context.activities[this.context.randomIndex].name,
        description: this.context.activities[this.context.randomIndex].description,
        is_accepted: false,
        is_rejected: true
      })
      .then(res => {
        if (this.state.filter === '') {
          console.log('Declined Activity - fetching all categories')
          this.context.fetchContextActivities()
        } else {
          console.log('Declined Activity - fetching by category:', this.state.filter)
          this.context.fetchContextActivitiesByCategory(this.state.filter)
        }
      })
    this.getRandomActivity()
  }

  lastDecision = () => {
    if (this.context.activities[this.context.randomIndex].is_rejected && !this.context.activities[this.context.randomIndex].is_accepted) {
      
      return 'rejected'
    }
    else if (!this.context.activities[this.context.randomIndex].is_rejected && this.context.activities[this.context.randomIndex].is_accepted) {
      
      return 'accepted'
    }
    else {
    
      return 'neither accepted nor rejected'
    }

  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    }, () => console.log('Filter changed - current state: ', this.state))

    
  }

  componentDidMount() {
    
    
    if (this.state.filter === '') {
      console.log('Component did mount - fetching all categories')
      this.context.fetchContextActivities()
    } else {
      console.log('Component did mount - fetching by category:', this.state.filter)
      this.context.fetchContextActivitiesByCategory(this.state.filter)
    }

    this.setState({
      activityGenerated: false,
      activitySelected: false
    })
    
    /**
     * Right now these are just testing the connection to
     * the back end.  They might need to be used
     * from within context.
     */

    ActivityService.fetchCategories()
      .then(res => this.setState({
        categories: res
      }))
  }

  render() {

    
    return (<>
      <div className="activity-form" id="form-wrapper">
        <div className="test-context">
          Hi, this will have context if it is working:
          {this.context.activities[0] ? this.context.activities[0].name : 'context is not working'}
        </div>
        {/* <button className="get-random-button button-primary" onClick={this.getRandomActivity}>
          Random Activity Please!
        </button> */}
     
        <section className='result-wrapper'>
        <div className="display-chosen-activity">
          {this.state.activitySelected && this.context.activities[0]
            ? `You have chosen "${this.context.activities[this.context.randomIndex].name}."  Enjoy!`
            : ''}
        </div>
  
          <div className="display-random-activity">
            <p>{this.context.activities && this.state.activityGenerated
            ? `Your random activity is: ${this.context.activities[this.context.randomIndex].name}`
              : ''}</p>
            <p>
              {this.context.activities && this.state.activityGenerated
            ? `The description is: ${this.context.activities[this.context.randomIndex].description}`
            : ''}
            </p>
            <p>
              {this.context.activities && this.state.activityGenerated
            ? `Last time you ${this.lastDecision()} this choice`
            : ''}
            </p>

          <div className="dropdown-div">
              <label htmlFor="filter-select" />
            <select 
              value={this.state.filter} 
              onChange={this.handleFilterChange} 
            >
              <option id="filter-select" value="Entertainment">Entertainment</option>
              <option id="filter-select" value="Chores">Chores</option>
              <option id="filter-select" value="Learn">Learn</option>
              <option id="filter-select" value="Fitness">Fitness</option>
              <option id="filter-select" value="Socialize">Socialize</option>
          </select>
      
        </div>

            <div className="button-group">
  
              {!this.state.activityGenerated && <button className="get-random-button button-primary" onClick={this.getRandomActivity}>
                Random Activity Please!
              </button>}
              {this.state.activityGenerated && <button className="button-primary" onClick={this.acceptRandomActivity}>Accept</button>}
              {this.state.activityGenerated && <button className="button-cancel" onClick={this.declineRandomActivity}>Decline</button>}
            </div>
        
        
        </div>
        <MyList />
        </section>
        
      </div>
      <UserProfile />
      </>
    )
  }
}

Dashboard.defaultProps = {
  activities: []
}
