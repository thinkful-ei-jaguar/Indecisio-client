import React, {Component} from 'react';
import ProfileService from '../services/profile-service';
import UserContext from '../contexts/UserContext';
import TopActivityItem from '../TopActivityItem/TopActivityItem'
import '../UserProfile/UserProfile.css';

export default class UserProfile extends Component {
    static contextType = UserContext

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
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    render() {
        const {user} = this.context
        const {error, topUserActivities} = this.state
        return(
            <section id="form-wrapper">
            <h2>{user.name}'s Top Activities</h2>
            <p>Activities most loved by you!</p>
            {error && <p>{error}</p>}
            <ol>
                {topUserActivities.map((activity, index) => <TopActivityItem activity={activity} key={index}/>)}
            </ol>
            </section>
        )
    }
}