import React, { Component } from 'react'
import config from '../config'
import ActivityService from '../services/activity-service'

const ActivityContext = React.createContext({
  activities: []
});

export default ActivityContext;

export class ActivityProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activities: []
    }
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
