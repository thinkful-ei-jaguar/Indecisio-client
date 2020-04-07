import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProfileService from '../services/profile-service';
import UserContext from '../contexts/UserContext';
import TopActivityItem from '../TopActivityItem/TopActivityItem';
import './UserProfile.css';

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
            <section id="popular-wrapper">
            <h2>{user.name}'s Top Activities</h2>
            
            {error && <p>{error}</p>}
            {topUserActivities.length === 0 
            ? <>
                <h2>You haven't decided to do anything yet!</h2>
                <Link to='/dashboard'>Get Started Today!</Link>
              </>
            :<>
                <p classNAme='user-profile'>Activities most loved by you!</p>
                <ol>
                    {topUserActivities.map((activity, index) => <TopActivityItem activity={activity} index={index} />)}
                </ol>
             </>
            }
            </section>
        )
    }
}