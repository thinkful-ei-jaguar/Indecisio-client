import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import MyList from '../MyList/MyList'
import './Dashboard.css';
import ActivityService from '../services/activity-service'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard extends Component {
  
  
  
  static contextType = ActivityContext;
  constructor(props) {
    super(props);

    this.state = {
      activityGenerated: false,
      activitySelected: true,
      activityDenied: false,
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
      activitySelected: false,
      activityDenied: false
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
    this.setState({
      activityDenied: true,
      activityGenerated: false
    })
    // this.getRandomActivity()
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
    this.context.clearContextEmptyMessage()
    this.setState({
      filter: event.target.value
    }, () => {
        if (this.state.creatorFilter === 'me') {
          if(this.state.filter === '') {
            this.context.fetchContextUserActivities(this.props.user)
          }
          else {
            this.context.fetchContextUserActivitiesByCategory(this.props.user, this.state.filter)
          }
        }
        else {
          if(this.state.filter !== '') {
            this.context.fetchContextActivitiesByCategory(this.state.filter)
          }
          else {
            this.context.fetchContextActivities()
          }
        }
    })
  }

  handleCreatorFilterChange = (event) => {
    this.context.clearContextEmptyMessage()
    this.setState({
      creatorFilter: event.target.value,

    }, () => {
      if (this.state.creatorFilter === 'me') {
        if(this.state.filter === '') {
          this.context.fetchContextUserActivities(this.props.user)
        }
        else {
          this.context.fetchContextUserActivitiesByCategory(this.props.user, this.state.filter)
        }
      }
      else {
        if(this.state.filter !== '') {
          this.context.fetchContextActivitiesByCategory(this.state.filter)
        }
        else {
          this.context.fetchContextActivities()
        }
      }
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


  goBackToBeginning = () => {
      this.setState({
        activitySelected: false,
        activityDenied: false
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
      activitySelected: false,
      activityDenied: false
    })
    
  }

  render() {
    return (<>
      <div id="dashboard-wrapper">
        <section className='result-wrapper'>
        <div>
              <button className="get-random-button button-primary" onClick={this.getRandomActivity}>
                Random Activity Please!
              </button>
              <div className="dropdown-div">
              <label className="filter-select" htmlFor="filter-select">Choices by Category:</label>
            <select
                id="dash-filter"
                name='filter-select'
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
  
          <form name='radio-options' id="radio-options">
            <div>
            
            <input type="radio" name="global" id="global" value="global"
              checked={this.state.creatorFilter==='global'}
              onChange={this.handleCreatorFilterChange}>
            </input>
            <label htmlFor="global">Created by anyone</label>
            </div>
            <div>
            
            <input type="radio" name="me" id="me" value="me"
              checked={this.state.creatorFilter==='me'}
              onChange={this.handleCreatorFilterChange}>
            </input>
            <label htmlFor="me">Created by me</label>
            </div>

          </form>
        </div>
        </div>
  
          <div className={ (this.state.activityGenerated || this.state.activitySelected || this.state.activityDenied) ? "display-random-activity suggestionBorder" : ""}>
            <div className="empty-message">{this.state.activityGenerated && this.context.emptyMessage}</div>
            {this.state.activitySelected === false && this.state.activityGenerated === false && this.state.activityDenied === false
              ? <MyList />
              : <></>}
            
            {this.context.activities && this.state.activityGenerated
              ? <h3>{this.context.activities[this.context.randomIndex].name}</h3>
              : <></>}
            
            
            {this.context.activities && this.state.activityGenerated
            ? <p>{this.context.activities[this.context.randomIndex].description}</p>
            : <></>}
            
            
            {this.context.activities && this.state.activityGenerated
            ? <p>Last time you {this.lastDecision()} this choice</p>
            : <></>}
            
            <div className="button-group" id="result-buttons">
                {this.state.activityGenerated && <button className="button-choose" onClick={this.acceptRandomActivity}><FontAwesomeIcon icon={faCheck}/> Let's Do It!</button>}
                {this.state.activityGenerated && <button className="button-choose" onClick={this.declineRandomActivity}><FontAwesomeIcon icon={faBan}/> No, Thanks!</button>}
              </div>
              <div id="chosen" className={ (this.state.activitySelected || this.state.activityDenied) ? "display-chosen-activity" : "hideMeh"}>
                {this.state.activitySelected && this.context.activities[0]
                  ? <><h3><FontAwesomeIcon icon={faCheck}/> You have chosen "{this.state.chosenActivity.name}."  Enjoy!</h3>
                      <button className="button-choose" onClick={e => this.goBackToBeginning()}><FontAwesomeIcon icon={faChevronLeft}/> Go Back</button></>
                  : ''}
                {this.state.activityDenied && this.context.activities[0]
                  ?<><h3><FontAwesomeIcon icon={faBan}/> You've decided not to to this activity.</h3>
                  <button className="button-choose" onClick={e => this.goBackToBeginning()}><FontAwesomeIcon icon={faChevronLeft}/> Go Back</button></>
                  : ''}
              </div>
        </div>
        </section>
      </div>
      
      </>
    )
  }
}

Dashboard.defaultProps = {
  user: 0
}
