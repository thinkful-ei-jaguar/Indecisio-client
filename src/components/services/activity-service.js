import  config  from '../config';

const ActivityService = {
	
	postActivity : (newActivity) => {
		return fetch(`${config.API_ENDPOINT}/activity`, {
			method: 'POST',
			headers: {'content-type': 'application/json'},
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
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
			.then(res => res.ok
				? Promise.resolve(res.json())
				: Promise.reject('Cannot get Activities')
			)
	
}
}

export default ActivityService;