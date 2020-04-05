import React, {Component} from 'react'
import ProfileService from '../services/profile-service'

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
                    ? <li key={key}>{activity.name} <button onClick={e => this.handleClose()}>Close</button></li>
                    : <li key={key}>{activity.name} <button onClick={e => this.handleOpen()}>Open</button></li>}
            </>
        )
    }
}