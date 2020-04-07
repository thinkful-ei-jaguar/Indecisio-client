import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import MyList from '../MyList/MyList'
import './Dashboard.css';
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
      showFilters: false,
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
    if(this.state.creatorFilter === 'me') {
      return this.getUserActivities()
    }
    if (this.state.filter === '') {
      console.log('Accepted Activity - fetching all categories')
      this.context.fetchContextActivities()
    } else {
      console.log('Accepted Activity - fetching by category:', this.state.filter)
      this.context.fetchContextActivitiesByCategory(this.state.filter)
    }
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
  }

  acceptRandomActivity = () => {
    console.log('Random activity accepted :)')
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

  handleCreatorFilterChange = (event) => {
    this.setState({
      creatorFilter: event.target.value
    }, () => console.log('Creator filter changed - current state: ', this.state))
  }

  /**
   * Need to change getUserActivities so that it gets the actual
   * user_id, probably passing it in as props.
   */
  getUserActivities = () => {
    if (this.state.filter === '') {
      this.context.fetchContextUserActivities(2)
    } else {
      this.context.fetchContextUserActivitiesByCategory(2, this.state.filter)
    }
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
    
  }

    handleFilters = () => {
      this.setState({
        showFilters: !this.state.showFilters
      })
    }


  componentDidMount() {
    console.log('USER: ' + this.props.user);
    
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
    
  }

  render() {
    console.log("Props?", this.props)
    return (<>
      <div className="activity-form" id="dashboard-wrapper">
        <section className='result-wrapper'>
        <div id="chosen" className="display-chosen-activity">
          {this.state.activitySelected && this.context.activities[0]
            ? `You have chosen "${this.state.chosenActivity.name}."  Enjoy!`
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
            {!this.showFilters && <button id='show-filters' onClick={this.handleFilters}>i</button>}
            {this.state.showFilters && <div className="dropdown-div">
              <label htmlFor="filter-select">Filter by Category:</label>
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
      
          <label htmlFor="creator-filter-select">Filter by creator:</label>
            <select
                className='dashboard-select'
              value={this.state.creatorFilter} 
              onChange={this.handleCreatorFilterChange} 
            >
              <option id="creator-filter-select" value="global">Created by anyone</option>
              <option id="creator-filter-select" value="me">Created by me</option>
          </select>
        </div>}

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
      
      </>
    )
  }
}

Dashboard.defaultProps = {
  activities: [],
  user: 0
}
