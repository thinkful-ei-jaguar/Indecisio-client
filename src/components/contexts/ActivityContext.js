import React, { Component } from 'react'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: [],
  fetchContextActivities: () => {},
  fetchContextUserActivities: () => {},
  fetchContextActivitiesByCategory: () => {},
  fetchContextUserActivitiesByCategory: () => {},
  postActivity: () => {},
  createContextRandomIndex: () => {}
});

export default ActivityContext;

export class ActivityProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activities: [],
      randomIndex: 0
    }
  }
  /**
   * Use auth to determine if logged in, store that in 
   * state for fetched activities
   */

  createContextRandomIndex = () => {
    let randomActivityIndex = 0;
    console.log('context.activities.length: ', this.state.activities.length )
    randomActivityIndex = this.state.activities[0]
      ? (Math.floor(Math.random() * this.state.activities.length)) 
      : 0;

    this.setState({
      randomIndex: randomActivityIndex
    })
  }

  fetchContextActivities = () => {
    ActivityService.fetchActivities()
      .then(res=> {
        console.log('Fetched this using service function:', res);

        this.setState({
          activities: res,
          randomIndex: 0
      }, () => this.createContextRandomIndex());
    })
  }

  fetchContextUserActivities = (user_id) => {
    ActivityService.fetchUserActivities(user_id)
      .then(res=> {
        console.log('Fetched user activities with service function:', res);

        this.setState({
          activities: res,
          randomIndex: 0
      }, () => this.createContextRandomIndex());
    })
  }

  fetchContextActivitiesByCategory = (cat_name) => {
    ActivityService.fetchActivitiesByCategory(cat_name)
      .then(res=> {
        console.log('Res from fetch activities by category:', res)
        if (res === 'No activity with that category') {
          console.log('You have no activities in that category')
          return this.fetchContextActivities()
        } else {
          this.setState({
            activities: res,
            randomIndex: 0
          }, () => this.createContextRandomIndex())
        }
        
    })
  }

  fetchContextUserActivitiesByCategory = (user_id, cat_name) => {
    ActivityService.fetchUserActivitiesByCategory(user_id, cat_name)
      .then(res=> {
        console.log('Res from fetch user activities by category:', res)
        if (res.length === 0) {
          console.log('You have no activities in that category')
          return this.fetchContextUserActivities()
        } else {
          this.setState({
            activities: res,
            randomIndex: 0
          }, () => this.createContextRandomIndex())
        }
        
    })
  }



  
  

  render() {
    
    const value = {
      fetchContextActivities: this.fetchContextActivities,
      fetchContextUserActivities: this.fetchContextUserActivities,
      activities: this.state.activities,
      randomIndex: this.state.randomIndex,
      fetchContextActivitiesByCategory: this.fetchContextActivitiesByCategory,
      fetchContextUserActivitiesByCategory: this.fetchContextUserActivitiesByCategory,
      createContextRandomIndex: this.createContextRandomIndex
    }

    return (
      <ActivityContext.Provider value={value}>
        {this.props.children}
      </ActivityContext.Provider>
    )
  }
}
