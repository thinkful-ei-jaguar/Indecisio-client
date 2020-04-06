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
				category_id: newActivity.category,
				creator_id: newActivity.creator
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

	fetchUserActivities : (user_id) => {
		let testBody = {user: {
			id: user_id
		}}
		return fetch(`${config.API_ENDPOINT}/profile/notglobal`, {
      method: 'POST',
      headers : {
        'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			 },
			body: JSON.stringify(testBody)
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

	fetchUserActivitiesByCategory : (user_id, cat_name) => {
		let testBody = {user: {
			id: user_id
		}}
		return fetch(`${config.API_ENDPOINT}/profile/notglobal/${cat_name}`, {
      method: 'POST',
      headers : {
        'content-type': 'application/json',
				'authorization': `Bearer ${TokenService.getAuthToken()}`
			 },
			body: JSON.stringify(testBody)
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