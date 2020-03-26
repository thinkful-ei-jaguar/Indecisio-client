import React, { Component } from 'react'
import config from '../../config'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: [],
  fetchActivities: () => {},
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
  
  componentDidMount () {
    ActivityService.fetchActivities()
      .then(res=> {
        console.log('Fetched this using service function:', res);

        this.setState({
          activities: res
      });
    })
  }

  render() {
    
    const value = {
      fetchActivities: this.fetchActivities,
      activities: this.state.activities
    }

    return (
      <ActivityContext.Provider value={value}>
        {this.props.children}
      </ActivityContext.Provider>
    )
  }
}
