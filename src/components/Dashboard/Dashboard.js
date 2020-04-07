import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import MyList from '../MyList/MyList'
import './Dashboard.css';
import ActivityService from '../services/activity-service'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
      filter: '',
      creatorFilter: 'global',
      chosenActivity: {}
    }
  }
  
  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {  
    this.context.clearContextEmptyMessage()
    if(this.state.creatorFilter === 'me') {
      return this.getUserActivities()
    }
    if (this.state.filter === '') {
      this.context.fetchContextActivities()
    } else {
      this.context.fetchContextActivitiesByCategory(this.state.filter)
    }
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
  }

  acceptRandomActivity = () => {
    this.context.clearContextEmptyMessage()
    this.setState({
      activityGenerated: false,
      activitySelected: true,
      chosenActivity: this.context.activities[this.context.randomIndex]
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
          this.context.fetchContextActivities()
        } else {
          this.context.fetchContextActivitiesByCategory(this.state.filter)
        }
      })
  }
  declineRandomActivity = () => {
    this.context.clearContextEmptyMessage()
    if (this.state.creatorFilter === 'me') {
      return this.getUserActivities()
    }
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
          this.context.fetchContextActivities()
        } else {
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
    })
  }

  handleCreatorFilterChange = (event) => {
    this.setState({
      creatorFilter: event.target.value
    })
  }

  getUserActivities = () => {
    if (this.state.filter === '') {
      this.context.fetchContextUserActivities(this.props.user)
    } else {
      this.context.fetchContextUserActivitiesByCategory(this.props.user, this.state.filter)
    }
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
    
  }


  componentDidMount() {
    this.context.clearContextEmptyMessage()
    if (this.state.filter === '') {
      this.context.fetchContextActivities()
    } else {
      this.context.fetchContextActivitiesByCategory(this.state.filter)
    }

    this.setState({
      activityGenerated: false,
      activitySelected: false
    })
    
  }

  render() {
    return (<>
      <div className="form-wrapper" id="dashboard-wrapper">
        <section className='result-wrapper'>
        <div className="button-group">
              <button className="get-random-button button-primary" onClick={this.getRandomActivity}>
                Random Activity Please!
              </button>
              {/* {this.state.activityGenerated && <button className="button-primary" onClick={this.acceptRandomActivity}>Accept</button>}
              {this.state.activityGenerated && <button className="button-cancel" onClick={this.declineRandomActivity}>Decline</button>} */}
        </div>

        <div className="dropdown-div">
              <label className="filter-select" htmlFor="filter-select">Choose by Category:</label>
            <select
              className='dashboard-select'
              value={this.state.filter} 
              onChange={this.handleFilterChange} 
            >
              <option id="filter-select" value="">All Categories</option>
              <option id="filter-select" value="Entertainment">Entertainment</option>
              <option id="filter-select" value="Chores">Chores</option>
              <option id="filter-select" value="Learn">Learn</option>
              <option id="filter-select" value="Fitness">Fitness</option>
              <option id="filter-select" value="Socialize">Socialize</option>
          </select>
      
          <label className="filter-select" htmlFor="creator-filter-select">Choose by Creator:</label>
            <select
                className='dashboard-select'
              value={this.state.creatorFilter} 
              onChange={this.handleCreatorFilterChange} 
            >
              <option id="creator-filter-select" value="global">Created by anyone</option>
              <option id="creator-filter-select" value="me">Created by me</option>
          </select>
        </div>
  
          <div className={ (this.state.activityGenerated) ? "display-random-activity suggestionBorder" : "display-random-activity"}>
            <div className="empty-message">{this.context.emptyMessage}</div>
            <p>
              {this.context.activities && this.state.activityGenerated
                ? `Your random activity is: ${this.context.activities[this.context.randomIndex].name}`
                : <></>}
            </p>
            <p>
              {this.context.activities && this.state.activityGenerated
            ? `The description is: ${this.context.activities[this.context.randomIndex].description}`
            : <></>}
            </p>
            <p>
              {this.context.activities && this.state.activityGenerated
            ? `Last time you ${this.lastDecision()} this choice`
            : <></>}
            </p>

              <div id="chosen" className="display-chosen-activity">
                {this.state.activitySelected && this.context.activities[0]
                  ? <h2>You have chosen "{this.state.chosenActivity.name}."  Enjoy!</h2>
                  : ''}
              <div className="button-group">
                {this.state.activityGenerated && <button className="button-primary" onClick={this.acceptRandomActivity}>Accept</button>}
                {this.state.activityGenerated && <button className="button-cancel" onClick={this.declineRandomActivity}>Decline</button>}
              </div>
              </div>
        </div>
        <MyList />
        </section>
        
      </div>
      
      </>
    )
  }
}

Dashboard.defaultProps = {
  user: 0
}
