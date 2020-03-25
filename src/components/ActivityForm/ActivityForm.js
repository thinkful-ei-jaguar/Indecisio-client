import React from 'react';
import ActivityService from '../../services/activity-service';
import ValidationError from '../ValidationError/ValidationError';
import './ActivityForm.css';
export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		name: '',
		description: '',
		error: null
		}};
	
	static defaultProps = {
		onSubmitActivitySuccess: () => {
			this.history.push("/");
		}
	};
	
	validateNewActivitySubmit (value)  {
		const name = value.trim();
		if (!name.length){
			return 'Name of activity is required'
		} else {
			return false
		}
	}
	
	
	clearError = () => {
		this.setState({
			error: null
		})
	};
	
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};
	
	handleSubmit = (event) => {
		event.preventDefault();
		const {name, description} = this.state;
		const newActivity = {name, description};
		console.log(newActivity);
		ActivityService.postActivity(newActivity)
			.then(res => {
				this.setState({name: '', description: ''})
			})
		
			.catch(res => {
				this.setState({ error: res.error});
				this.props.onSubmitActivitySuccess();
			});
	};
	
	
	render() {
		const { error } = this.state;
		
		return (
			<section id='form-wrapper'>
				<form className="activity-form" onSubmit={this.handleSubmit}>
				<h2>Add Activity</h2>
					
					<label className='form-input-label' htmlFor="name">Name</label><input className='activity-form-text-input'  name="name" placeholder='name' type="text" onChange={this.handleChange} value={this.state.name}/>
					<label className='form-input-label' htmlFor="description">Description</label><textarea maxLength='200' className='activity-form-textarea-input' placeholder='description' name="description"  onChange={this.handleChange} value={this.state.description}/>
						{error && (<ValidationError message={error} clearError={this.clearError}/>)}
					<button className='button-primary'type='submit'>Submit</button>
				</form>
			</section>
		)
		
	}
}
