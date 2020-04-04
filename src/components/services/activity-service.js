import config from '../../config';
import TokenService from '../services/token-service';

const ActivityService = {
	
	postActivity : (newActivity) => {
		return fetch(`${config.API_ENDPOINT}/activity`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`},
			body: JSON.stringify({
				name: newActivity.name,
				description: newActivity.description,
				category: newActivity.category
			})
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
	
	},
	
	fetchCategories : () => {
		return fetch(`${config.API_ENDPOINT}/categories`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			}
		})
			.then(res => res.ok
				? Promise.resolve(res.json())
				: Promise.reject('Cannot get categories')
			)
	},

	fetchActivitiesByCategory : (cat_name) => {
    return fetch(`${config.API_ENDPOINT}/categories/${cat_name}`, {
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
	
	},

	updateActivity: (activity_id, updatedActivity) => {
		return fetch(`${config.API_ENDPOINT}/activity/${activity_id}`, {
			method: 'PATCH',
			headers : {
    		'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			 },
			body: JSON.stringify(updatedActivity)
		})
		.then(res => res.ok
			? Promise.resolve()
			: Promise.reject('An error occured while trying to update')
		)},

	fetchCategories: () => {
		return fetch(`${config.API_ENDPOINT}/categories`, {
			method: 'GET',
			headers : {
    		'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			 },
		})
		.then(res => res.json())
	},

	fetchByCategory: () => {

	}
}	

export default ActivityService;