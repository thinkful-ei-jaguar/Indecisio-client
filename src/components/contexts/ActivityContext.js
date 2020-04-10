import React, { Component } from 'react'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: [],
  emptyMessage: '',
  fetchContextActivities: () => {},
  fetchContextUserActivities: () => {},
  fetchContextActivitiesByCategory: () => {},
  fetchContextUserActivitiesByCategory: () => {},
  postActivity: () => {},
  createContextRandomIndex: () => {},
  clearContextEmptyMessage: () => {}
});

export default ActivityContext;

export class ActivityProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activities: [],
      randomIndex: 0,
      emptyMessage: ''
    }
  }
  /**
   * Use auth to determine if logged in, store that in 
   * state for fetched activities
   */


  clearContextEmptyMessage = () => {
    this.setState({
      emptyMessage: ''
    })
  }
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
        if (res.length === 0) {
          this.setState({
            emptyMessage: 'You have not created any activities!  Get on that!  For now, here is an activity someone else created: '
          })
          return this.fetchContextActivities()
        }
        else {
          this.setState({
            activities: res,
            randomIndex: 0
          }, () => this.createContextRandomIndex());
        }
    })
  }

  fetchContextActivitiesByCategory = (cat_name) => {
    ActivityService.fetchActivitiesByCategory(cat_name)
      .then(res=> {
        console.log('Res from fetch activities by category:', res)
        if (res === 'No activity with that category') {
          console.log('You have no activities in that category')
          this.setState({
            emptyMessage: 'There are no activities in that category.  Here is an activity from another category: '
          })
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
          this.setState({
            emptyMessage: 'You have not created any activities in that category.  Selecting from another category that you created:'
          })
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
      emptyMessage: this.state.emptyMessage,
      randomIndex: this.state.randomIndex,
      fetchContextActivitiesByCategory: this.fetchContextActivitiesByCategory,
      fetchContextUserActivitiesByCategory: this.fetchContextUserActivitiesByCategory,
      createContextRandomIndex: this.createContextRandomIndex,
      clearContextEmptyMessage: this.clearContextEmptyMessage
    }

    return (
      <ActivityContext.Provider value={value}>
        {this.props.children}
      </ActivityContext.Provider>
    )
  }
}
