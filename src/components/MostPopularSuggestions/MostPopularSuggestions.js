import React, {Component} from 'react'
import ProfileService from '../services/profile-service';
import TopActivityItem from '../TopActivityItem/TopActivityItem'

export default class MostPopularSuggestions extends Component {
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
            .catch(error => {
                this.setState({
                    error: error
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
                {topActivities.map((activity, index) => <TopActivityItem activity={activity} key={index} />)}
            </ol>
        </section>
        )
    }
}