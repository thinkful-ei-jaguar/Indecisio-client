import React, {Component} from 'react'

export default class TopActivityItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    handleOpen = () => {
        this.setState({
            expanded: true
        })
    }

    handleClose = () => {
        this.setState({
            expanded: false
        })
    }
    
    render() {
        const {expanded} = this.state
        const {activity, key} = this.props
        return (
            <>
                {expanded 
                    ? <li key={key}><h3>{activity.name} <button onClick={e => this.handleClose()}>Close</button></h3>
                            <p>{activity.description} </p>
                            <p>This activity was accepted {activity.accepted_count || activity.global_accepted_count} times!</p>
                            <p>Suggested by {activity.username}</p>
                        </li>
                    : <li key={key}>{activity.name} <button onClick={e => this.handleOpen()}>Open</button></li>}
            </>
        )
    }
}