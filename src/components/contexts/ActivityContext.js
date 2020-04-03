import React, { Component } from 'react'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: [],
  fetchContextActivities: () => {},
  postActivity: () => {}
});

export default ActivityContext;

export class ActivityProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activities: []
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
          activities: res
      });
    })
  }

  fetchContextActivitiesByCategory = (cat_name) => {
    ActivityService.fetchActivitiesByCategory(cat_name)
      .then(res=> {
        this.setState({
          activities: res
        })
    })
  }
  

  render() {
    
    const value = {
      fetchContextActivities: this.fetchContextActivities,
      activities: this.state.activities,
      fetchContextActivitiesByCategory: this.fetchContextActivitiesByCategory
    }

    return (
      <ActivityContext.Provider value={value}>
        {this.props.children}
      </ActivityContext.Provider>
    )
  }
}
