import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../services/token-service';
import ProfileService from '../services/profile-service';
import TopActivityItem from '../TopActivityItem/TopActivityItem';
import './MostPopularActivities.css';

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
                    error: error.message
                })
            })
    }


    render() {
        const {error, topActivities} = this.state;
        return(
        <section id="popular-wrapper" >
            <h2>Top Activity Suggestions</h2>
            
            {error && <p>Error: {error}</p>}
            {topActivities.length === 0 
            ? <>
                <h2>No one has decided to do anything yet!</h2>
                {TokenService.hasAuthToken()
                    ? <Link to='/dashboard'>Get Started Today!</Link>
                    : <Link to='/'>Get Started Today!</Link>
                }
              </>  
            :<>
                <p className='popular'>Activities most loved by Indeciders like you!</p>
                <ol>
                    {topActivities.map((activity, index) => <TopActivityItem activity={activity} key={index} />)}
                </ol>
             </>
            }
        </section>
        )
    }
}