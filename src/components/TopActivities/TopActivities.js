import React, {Component} from 'react'
import ProfileService from '../services/profile-service';


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
        return(
        <section id="form-wrapper">
            <h2>Top Activity Suggestions</h2>
            <p>Activities most loved by Indeciders like you!</p>
            {error && <p>{error}</p>}
            <ol>
                {topActivities.map(activity => {
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