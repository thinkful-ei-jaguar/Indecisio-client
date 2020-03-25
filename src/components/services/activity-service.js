const ActivityService = {
	
	postActivity : (newActivity) => {
		return fetch('http://localhost:8000/api/activity', {
			method: 'POST',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({name: newActivity.name, description: newActivity.description})
		}).then(res => res.ok ? Promise.resolve(res.json()) : Promise.reject('Cant post Activity'))
	}
	
}

export default ActivityService;