import React, {Component} from 'react'
import TokenService from '../services/token-service'
import MostPopularSuggestions from '../MostPopularSuggestions/MostPopularSuggestions'
import UserProfile from '../UserProfile/UserProfile'
import './top-activities.css';

export default class TopActivities extends Component {

    render() {

        return(
        <section className={(TokenService.hasAuthToken()) ? "top-activities" : "top-activities-lonely"}>
        <MostPopularSuggestions />
        {TokenService.hasAuthToken()
            ? <UserProfile />
            : <div className="hideMeh"/>}
        </section>)
    }

}