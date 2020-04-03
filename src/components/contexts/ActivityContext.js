import React, { Component } from 'react'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: [],
  fetchContextActivities: () => {},
  fetchContextActivitiesByCategory: () => {},
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

  fetchContextActivities = () => {
    ActivityService.fetchActivities()
      .then(res=> {
        console.log('Fetched this using service function:', res);

        this.setState({
          activities: res, 
          randomIndex: 0
      });
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
            activities: res
          })
        }
        
    })
  }

  createContextRandomIndex = () => {
    let randomActivityIndex = 0;
    console.log('context.activities.length: ', this.state.activities.length )
    randomActivityIndex = this.state.activities[0]
      ? [Math.floor(Math.random() * this.state.activities.length)] 
      : 0;

    this.setState({
      randomIndex: randomActivityIndex
    })
  }
  

  render() {
    
    const value = {
      fetchContextActivities: this.fetchContextActivities,
      activities: this.state.activities,
      randomIndex: this.state.randomIndex,
      fetchContextActivitiesByCategory: this.fetchContextActivitiesByCategory,
      createContextRandomIndex: this.createContextRandomIndex
    }

    return (
      <ActivityContext.Provider value={value}>
        {this.props.children}
      </ActivityContext.Provider>
    )
  }
}
