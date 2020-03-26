import   config   from '../../config';
import TokenService from '../services/token-service';

const ActivityService = {
	
	postActivity : (newActivity) => {
		return fetch(`${config.API_ENDPOINT}/activity`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`},
			body: JSON.stringify({name: newActivity.name, description: newActivity.description})
		})
			.then(res => res.ok
				? Promise.resolve(res.json())
				: Promise.reject('Cannot post Activity'))
	},

	fetchActivities : () => {
    return fetch(`${config.API_ENDPOINT}/activity`, {
      method: 'GET',
      headers : {
        'content-type': 'application/json',
		'authorization': `Bearer ${TokenService.getAuthToken()}`
       }
    })
			.then(res => res.ok
				? Promise.resolve(res.json())
				: Promise.reject('Cannot get Activities')
			)
	
}
}

export default ActivityService;