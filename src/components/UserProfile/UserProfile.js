import React, {Component} from 'react';
import ProfileService from '../services/profile-service';
import UserContext from '../contexts/UserContext';
import '../UserProfile/UserProfile.css';

export default class UserProfile extends Component {
    static contextType = UserContext

    state = {
        error: null,
        topUserActivities: [],
        expanded: false
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

    componentDidMount() {
        ProfileService.getUserProfile()
            .then(res => {
                this.setState({
                    topUserActivities: res
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    render() {
        const {user} = this.context
        const {error, topUserActivities, expanded} = this.state
        return(
        <>
            <h2>{user.name}'s Top Activities</h2>
            {error && <p>{error}</p>}
            <ol>
                {topUserActivities.map((activity, index) => {
                    return <li key={index}>
                                {expanded 
                                    ?<><h3>{activity.name}</h3><p>{activity.description}</p>
                                        <p>You've completed this activity {activity.accepted_count} times!</p>
                                        <p onClick={e => this.handleClose()}>close meh!</p></>
                                    :<><h3>{activity.name}</h3><p onClick={e => this.handleOpen()}>click meh!</p></>}
                            </li>
                })}
            </ol>
       </>
        )
    }
}