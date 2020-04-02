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
        return(<>
            {error && <p>{error}</p>}
            <ol>
                {topUserActivities.map(activity => {
                    return <li>
                                <p>{activity.name}</p>
                                <p>{activity.accepted_count}</p>
                            </li>
                })}
            </ol>
        </>
        )
    }
}