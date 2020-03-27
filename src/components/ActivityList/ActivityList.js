import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import '../Dashboard/Dashboard.css'
export default class ActivityList extends Component {
  static contextType = ActivityContext;
  render() {
    
    let activityList = this.context.activities[0]
      ? this.context.activities.map((activity, index) => 
        {let whatTheyDid = activity.is_rejected && !activity.is_accepted 
          ? 'rejected' 
          : activity.is_accepted && !activity.is_rejected 
          ? 'accepted' 
          : 'neither accepted nor rejected';
        return <li key={index}>{activity.name}  Last time you {whatTheyDid} this activity</li>})
      
      : [];
    return (
      <ul className="activity-list">
        <h2>Possible Activities: </h2>
        {activityList}
      </ul>
    )
  }
}
