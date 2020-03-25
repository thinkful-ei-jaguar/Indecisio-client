import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityGenerated: false
    }
  }
  
  toggleActivityGenerated = () => {
    this.setState({
      activityGenerated: true
    })
  }

  getRandomActivity = () => {
    console.log(this.props.state.activities)
    this.toggleActivityGenerated()
  }

  acceptRandomActivity = () => {
    console.log('Random activity accepted :)')
    this.setState({
      activityGenerated: false
    })
  }

  declineRandomActivity = () => {
    console.log('Random activity declined :(')
    this.setState({
      activityGenerated: false
    })
  }

  componentDidMount() {
    this.setState({
      activityGenerated: false
    })
  }

  render() {
    let randomActivityIndex = 0;
    randomActivityIndex = this.props.state ? [Math.floor(Math.random() * this.props.state.activities.length)] : 0;
    
    return (
      <div>
        <h1>Indecisio</h1>
        <button onClick={this.getRandomActivity}>
          Random Activity Please!
        </button>
        <div className="display-random-activity">
          <p>{this.props.state.activities[0] && this.state.activityGenerated
          ? `Your random activity is: ${this.props.state.activities[randomActivityIndex].name}`        
          : ''}</p>
          <p>
          {this.props.state.activities[0] && this.state.activityGenerated
          ? `The description is: ${this.props.state.activities[randomActivityIndex].description}`        
          : ''}
          </p>
        {this.state.activityGenerated && <button onClick={this.acceptRandomActivity}>Accept</button>}
        {this.state.activityGenerated && <button onClick={this.declineRandomActivity}>Decline</button>}
        </div>
      </div>
    )
  }
}
