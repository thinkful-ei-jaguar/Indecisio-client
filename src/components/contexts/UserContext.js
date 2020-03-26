import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service'

const UserContext = React.createContext({

})

export default UserContext

export class UserProvider extends Component {
    render() {
        const value = {}
        return(
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}