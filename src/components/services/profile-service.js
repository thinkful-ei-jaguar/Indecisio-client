import config from '../../config';
import TokenService from '../services/token-service'

const ProfileService = {
    getTopActvities: () => {
        return fetch(`${config.API_ENDPOINT}/profile/mostpopular`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.ok
                ? Promise.resolve(res.json())
                : Promise.reject('Cannot retrieve Most Popular Activities'))
    },
    getUserProfile: () => {
        return fetch(`${config.API_ENDPOINT}/profile/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.ok
            ? Promise.resolve(res.json())
            : Promise.reject('Cannot retrieve your profile at this time'))
    }
}

export default ProfileService;