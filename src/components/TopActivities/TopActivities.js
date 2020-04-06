import React, {Component} from 'react'
import TokenService from '../services/token-service'
import MostPopularSuggestions from '../MostPopularSuggestions/MostPopularSuggestions'
import UserProfile from '../UserProfile/UserProfile'


export default class TopActivites extends Component {
    render() {
        return( <>
        <MostPopularSuggestions />
        {TokenService.hasAuthToken()
            ? <UserProfile />
            : <></>}
        </>
        )
    }
}