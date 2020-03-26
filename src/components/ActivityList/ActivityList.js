import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import '../Dashboard/Dashboard.css'
export default class ActivityList extends Component {
  static contextType = ActivityContext;
  render() {
    
    let activityList = this.context.activities[0]
      ? this.context.activities.map((activity, index) => <li key={index}>{activity.name}</li>)
      : []
    return (
      <ul className="activity-list">
        <h2>Possible Activities: </h2>
        {activityList}
      </ul>
    )
  }
}
