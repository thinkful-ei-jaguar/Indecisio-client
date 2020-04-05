import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../services/token-service';
import ProfileService from '../services/profile-service';
import TopActivityItem from '../TopActivityItem/TopActivityItem';

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
            {topActivities.length === 0 
            ? <>
                <h2>No One Has Decided to do Anything Yet!</h2>
                {TokenService.hasAuthToken()
                    ? <Link to='/dashboard'>Get Started Today!</Link>
                    :<Link to='/'>Get Started Today!</Link>
                }
              </>  
            :<ol>
                {topActivities.map((activity, index) => <TopActivityItem activity={activity} key={index} />)}
             </ol>
            }
        </section>
        )
    }
}