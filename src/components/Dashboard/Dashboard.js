import React, { Component } from 'react'
import ActivityContext from '../contexts/ActivityContext'
import ActivityList from '../ActivityList/ActivityList'

export default class Dashboard extends Component {
  static contextType = ActivityContext;
  constructor(props) {
    super(props);

    this.state = {
      activityGenerated: false,
      activitySelected: true,
      activities: [],
      randomIndex: 0
    }
  }

  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {  
    this.createRandomIndex()
    this.toggleActivityGenerated()
    this.setState({
      activitySelected: false
    })
  }

  acceptRandomActivity = () => {
    console.log('Random activity accepted :)')
    this.setState({
      activityGenerated: false,
      activitySelected: true
    })
  }

  declineRandomActivity = () => {
    console.log('Random activity declined :(')
    this.getRandomActivity()
  }

  createRandomIndex = () => {
    let randomActivityIndex = 0;
    randomActivityIndex = this.context.activities[0]
      ? [Math.floor(Math.random() * this.context.activities.length)] 
      : 0;

    this.setState({
      randomIndex: randomActivityIndex
    })
  }

  componentDidMount() {
    this.setState({
      activityGenerated: false,
      activitySelected: false
    })
  }

  render() {
    // let randomActivityIndex = 0;
    // randomActivityIndex = this.context.activities[0]
    //   ? [Math.floor(Math.random() * this.context.activities.length)] 
    //   : 0;
    
    return (
      <div>
        <h1>Indecisio</h1>
        <div className="test-context">
          Hi, this will have context if it is working:
          {this.context.activities[0] ? this.context.activities[0].name : 'context is not working'}
        </div>
        <button onClick={this.getRandomActivity}>
          Random Activity Please!
        </button>
        <div className="display-chosen-activity">
          {this.state.activitySelected && this.context.activities[0] 
            ? `You have chosen "${this.context.activities[this.state.randomIndex].name}."  Enjoy!`
            : ''}
        </div>
        <div className="display-random-activity">
          <p>{this.context.activities && this.state.activityGenerated
            ? `Your random activity is: ${this.context.activities[this.state.randomIndex].name}`        
            : ''}</p>
          <p>
          {this.context.activities && this.state.activityGenerated
            ? `The description is: ${this.context.activities[this.state.randomIndex].description}`        
            : ''}
          </p>
        {this.state.activityGenerated && <button onClick={this.acceptRandomActivity}>Accept</button>}
        {this.state.activityGenerated && <button onClick={this.declineRandomActivity}>Decline</button>}
        </div>
        <ActivityList />
      </div>
    )
  }
}

Dashboard.defaultProps = {
  activities: []
}
