import React, {Component} from 'react'
import ProfileService from '../services/profile-service';
import '../UserProfile/UserProfile.css';

export default class UserProfile extends Component {
    state = {
        error: null,
        topUserActivities: []
    }

    componentDidMount() {
        ProfileService.getUserProfile()
            .then(res => {
                this.setState({
                    topUserActivities: res
                })
            })
    }

    render() {
        const {error, topUserActivities} = this.state
        return(
        <section id="form-wrapper">
            <h2>Your Top Activities</h2>
            {error && <p>{error}</p>}
            <ol>
                {topUserActivities.map(activity => {
                    return <li>
                                <h3>{activity.name}</h3>
                                {/* <p>You've completed this activity {activity.accepted_count} times!</p> */}
                            </li>
                })}
            </ol>
        </section>
        )
    }
}