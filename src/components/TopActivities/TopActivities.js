import React, {Component} from 'react'
import ProfileService from '../services/profile-service';
import TokenService from '../services/token-service'
import UserProfile from '../UserProfile/UserProfile'


export default class TopActivites extends Component {
    state = {
        error: null,
        topActivities: []
    }

    componentDidMount() {
        ProfileService.getTopActvities()
            .then(res => {
                this.setState({
                    topActivities: res
                })
            })
    }

    render() {
        const {error, topActivities} = this.state
        return( <>
        <section id="form-wrapper">
            <h2>Top Activity Suggestions</h2>
            <p>Activities most loved by Indeciders like you!</p>
            {error && <p>{error}</p>}
            <ol>
                {topActivities.map(activity => {
                    return <li>
                                <h3>{activity.name}</h3>
                            </li>
                })}
            </ol>
        </section>
        {TokenService.hasAuthToken()
            ? <section id="form-wrapper">
                <UserProfile />
              </section>
            : <></>}
        </>
        )
    }
}